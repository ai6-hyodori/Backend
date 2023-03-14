import { userRepository } from '../db/repository/User';
import { CustomError } from '../middlewares/filter';
import commonErrors from '../middlewares/filter/error/commonError';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

class UserService {
  constructor(userRepository) {
    this.user = userRepository;
  }
  async getAll() {
    const users = await userRepository.getAll();
    return users;
  }

  async create(userdto) {
    const emailexist = await this.findOnebyEmail(userdto);
    if (emailexist) {
      throw new CustomError(400, commonErrors.resourceDuplicationError);
    }

    userdto.id = randomUUID();
    userdto.password = await bcrypt.hash(userdto.password, 10);

    const createduser = await userRepository.create(userdto);
    return createduser;
  }

  async findOnebyId(userdto) {
    const findUser = await userRepository.findOnebyId(userdto);

    return findUser[0];
  }

  async findOnebyEmail(userdto) {
    const findUser = await userRepository.findOnebyEmail(userdto.email);

    return findUser[0];
  }
}

const userService = new UserService(userRepository);

export { userService };
