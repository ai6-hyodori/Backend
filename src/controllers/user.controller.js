import { Router } from 'express';
import { userService } from '../services/user.service';

const userController = Router();

userController.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
});

userController.get('/:id', async (req, res, next) => {
  try {
    const dto = req.params;
    const foundUser = await userService.findOnebyId(dto);

    res.status(200).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

userController.get('/:email', async (req, res, next) => {
  try {
    const dto = req.params;
    const foundUser = await userService.findOnebyEmail(dto);

    res.status(200).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

userController.post('/signup', async (req, res, next) => {
  try {
    const createUser = await userService.create(req.body);
    res.status(204).json({ data: null });
  } catch (error) {
    next(error);
  }
});

export { userController };
