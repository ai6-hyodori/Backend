import { Router } from 'express';
import commonErrors from '../middlewares/filter';
import { CustomError } from '../middlewares/filter';
import { challengeService } from '../services';
import { upload } from '../middlewares/handler/image.hander';
import { bucket, region } from '../config/aws.config';

import { logger } from '../middlewares/logger/config/logger';

const challengeController = Router();

const aws_url = `https://${bucket}.s3.${region}.amazonaws.com/`;

challengeController.post(
  '/create',
  upload.single('image'),
  async (req, res, next) => {
    try {
      const challengeDto = req.body;
      const imagePath = `${aws_url}${req.file.key}`;
      challengeDto['imagePath'] = imagePath;
      await challengeService.create(challengeDto);
      res.status(204).send('created successfully');
    } catch (error) {
      next(error);
    }
  },
);
challengeController.get('/', async (req, res, next) => {
  res.status(200).send(``);
});

export { challengeController };
