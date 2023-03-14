import { userRepository } from '../db/repository/User';
import { CustomError } from '../middlewares/filter';
import commonErrors from '../middlewares/filter/response/error/commonError';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import statusCode from '../middlewares/filter/response/statusCode';

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async getAll() {
    const users = await this.userRepository.getAll();
    return users;
  }

  async create(userDto) {
    const emailExist = await this.emailCheck(userDto);
    if (emailExist) {
      throw new CustomError(
        statusCode.NotFound,
        commonErrors.resourceDuplicationError,
      );
    }
    userDto.id = randomUUID();
    userDto.password = await bcrypt.hash(userDto.password, 10);

    await this.userRepository.create(userDto);
    return await this.findOneByEmail(userDto);
  }

  async findOneById(userDto) {
    const result = await userRepository.findOneById(userDto.id);

    if (!result) {
      throw new CustomError(
        statusCode.NotFound,
        commonErrors.resourceNotFoundError,
      );
    }

    return result[0];
  }

  async findOneByEmail(userDto) {
    const findUser = await this.userRepository.findOneByEmail(userDto.email);

    const result = findUser[0];

    if (!result) {
      throw new CustomError(
        statusCode.NotFound,
        commonErrors.resourceNotFoundError,
      );
    }

    return result;
  }

  async emailCheck(userDto) {
    const findUser = await this.userRepository.findOneByEmail(userDto.email);

    const result = findUser[0];

    return result;
  }
}

const userService = new UserService(userRepository);

export { userService };
