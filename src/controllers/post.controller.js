import { Router } from 'express';
import { postService } from '../services';

const postController = Router();

postController.get('/', async (req, res, next) => {
  try {
    const posts = await postService.getAll();
    res.status(200).json({ data: posts });
  } catch (error) {
    next(error);
  }
});

postController.post('/upload', async (req, res, next) => {
  try {
    const createPost = await postService.create(req.body);
    res.status(204).json({ data: null });
  } catch (error) {
    next(error);
  }
});

export { postController };
