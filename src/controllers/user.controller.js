import { Router } from 'express';
import { userService } from '../services/user.service';
import { signupvalidator } from '../middlewares/validator/auth.validator';
import statusCode from '../middlewares/filter/response/statusCode';

const userController = Router();

userController.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(statusCode.OK).json({ data: users });
  } catch (error) {
    next(error);
  }
});

userController.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await userService.findOneById(req.params);

    res.status(statusCode.OK).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

userController.get('/:email', async (req, res, next) => {
  try {
    const foundUser = await userService.findOneByEmail(req.params);

    res.status(statusCode.OK).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

userController.post('/signup', signupvalidator, async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(statusCode.Created).json({ data: result });
  } catch (error) {
    next(error);
  }
});

export { userController };
