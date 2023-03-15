import { Router } from 'express';
import { userService } from '../services/user.service';
import { signupvalidator } from '../middlewares/validator/auth.validator';

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
    const foundUser = await userService.findOneById(req.params);

    res.status(200).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

userController.get('/:email', async (req, res, next) => {
  try {
    const foundUser = await userService.findOneByEmail(req.params);

    res.status(200).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

userController.post('/signup', signupvalidator, async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

export { userController };
