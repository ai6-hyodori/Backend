import { execute } from '../../config/db.config';
import { logger } from '../../middlewares/logger/config/logger';

export class PostRepository {
  postResponse = `post_id, hashtag_id, user_id, title, content, image`;
  createPostWithImage = `hashtag_id, user_id, title, content, image`;
  createPostWithoutImage = `hashtag_id, user_id, title, content`;

  async getAll() {
    const sql = `SELECT * FROM Post`;

    return execute(sql);
  }
  async create(postDto) {
    const sqlWithImage = `INSERT INTO Post (${this.createPostWithImage}) VALUES (?, ?, ?, ?, ?)`;
    const sqlWithoutImage = `INSERT INTO Post (${this.createPostWithoutImage}) VALUES (?, ?, ?, ?)`;

    if (!postDto.image) {
      await execute(sqlWithoutImage, [
        postDto.hashtag_id,
        postDto.user_id,
        postDto.title,
        postDto.content,
      ]);
    } else {
      await execute(sqlWithImage, [
        postDto.hashtag_id,
        postDto.user_id,
        postDto.title,
        postDto.content,
        postDto.image,
      ]);
    }
  }

  async findById(id) {
    const sql = `SELECT ${this.postResponse} FROM Post WHERE post_id = ?`;
    return execute(sql, [id]);
  }
}

const postRepository = new PostRepository();

export { postRepository };
