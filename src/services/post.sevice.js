import { CustomError } from '../middlewares/filter/';
import commonErrors from '../middlewares/filter';
import { logger } from '../middlewares/logger/config/logger';
import { postRepository } from '../db/repositories/Post';

class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async create(postDto) {
    await postRepository.create(postDto);
  }

  async getAll() {
    const posts = await postRepository.getAll();
    return posts;
  }

  async findOneById(postDto) {
    const result = await postRepository.findById(postDto.id);

    if (!result) {
      throw new CustomError(404, commonErrors.resourceNotFoundError);
    }

    return result[0];
  }
}

const postService = new PostService();

export { postService };
