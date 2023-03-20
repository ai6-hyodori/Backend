import { Router } from 'express';
import { challengeService } from '../services';
import { upload } from '../middlewares/handler';
import { bucket, region } from '../config/aws.config';

const challengeController = Router();

const aws_url = `https://${bucket}.s3.${region}.amazonaws.com/`;
const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);
const dateString = year + '-' + month + '-' + day;

challengeController.post(
  '/create',
  upload.single('image'),
  async (req, res, next) => {
    try {
      const challengeDto = req.body;
      const imagePath = `${aws_url}${req.file.key}`;
      challengeDto['imagePath'] = imagePath;
      await challengeService.create(challengeDto);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);
challengeController.get('/:challenge_id', async (req, res, next) => {
  try {
    const { challenge_id } = req.params;
    const challengeData = await challengeService.findOneById(challenge_id);
    res.status(200).send({ data: challengeData });
  } catch (error) {
    next(error);
  }
});

challengeController.put(
  '/:challenge_id',
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { challenge_id } = req.params;
      const challengeDto = req.body;
      const imagePath = `${aws_url}${req.file.key}`;
      challengeDto['imagePath'] = imagePath;
      // challengeDto['challenge_id'] = challenge_id;

      await challengeService.updateOneById({ challenge_id, challengeDto });
      res.status(200).send('updated successfully');
    } catch (error) {
      next(error);
    }
  },
);

challengeController.delete('/delete/:challenge_id', async (req, res, next) => {
  try {
    const { challenge_id } = req.params;
    await challengeService.deleteOneById(challenge_id);
    res.status(200).send('deleted successfully');
  } catch (error) {
    next(error);
  }
});

challengeController.get('/status/progressing', async (req, res, next) => {
  try {
    const progressingChallenge = await challengeService.findProgressing(
      dateString,
    );
    res.status(200).json({ data: progressingChallenge });
  } catch (error) {
    next(error);
  }
});
challengeController.get('/status/recruiting', async (req, res, next) => {
  try {
    const recruitingChallenge = await challengeService.findRecruiting(
      dateString,
    );
    res.status(200).json({ data: recruitingChallenge });
  } catch (error) {
    next(error);
  }
});
challengeController.get('/status/ended', async (req, res, next) => {
  try {
    const endedChallenge = await challengeService.findEnded(dateString);
    res.status(200).json({ data: endedChallenge });
  } catch (error) {
    next(error);
  }
});

export { challengeController };
