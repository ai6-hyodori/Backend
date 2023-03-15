import { userRepository } from '../db/repositories/User';
import { CustomError } from '../middlewares/filter';
import commonErrors from '../middlewares/filter/error/commonError';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    const users = await this.userRepository.getAll();
    return users;
  }

  async create(userDto) {
    await this.emailCheck(userDto);

    userDto.id = randomUUID();
    userDto.password = await bcrypt.hash(userDto.password, 10);

    await this.userRepository.create(userDto);
    return await this.findOneByEmail(userDto);
  }

  async findOneById(userDto) {
    const result = await userRepository.findOneById(userDto.id);

    if (!result) {
      throw new CustomError(404, commonErrors.resourceNotFoundError);
    }

    return result[0];
  }

  async findOneByEmail(userDto) {
    const findUser = await this.userRepository.findOneByEmail(userDto.email);

    const result = findUser[0];

    if (!result) {
      throw new CustomError(404, commonErrors.resourceNotFoundError);
    }

    return result;
  }

  async emailCheck(userDto) {
    const findUser = await this.userRepository.findOneByEmail(userDto.email);

    const result = findUser[0];

    if (result) {
      throw new CustomError(404, commonErrors.resourceDuplicationError);
    }
  }
}

const userService = new UserService(userRepository);

export {userService};
