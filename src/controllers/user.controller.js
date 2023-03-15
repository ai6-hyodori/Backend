import { Router } from 'express';
import { userService } from '../services';
import { loginValidator } from '../middlewares/validator';
import { localLogin } from '../middlewares/handler';
import { jwtGuard } from '../middlewares/guard';

const userController = Router();

userController.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
});

userController.get('/:email', jwtGuard, async (req, res, next) => {
  try {
    const dto = req.params;
    const findedUser = await userService.findOneByEmail(dto);
    res.status(200).json({ data: findedUser });
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

userController.post('/login', loginValidator, localLogin);

export { userController };
