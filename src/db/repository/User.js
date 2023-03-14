// noinspection JSUnresolvedVariable

import { execute } from '../../config/db.config';

export class UserRepository {
  responseUser = `user_id, name, email, phone`;
  createUser = `user_id, name, email, password, phone`;

  async getAll() {
    const sql = `SELECT ${this.responseUser} FROM User`;
    return execute(sql);
  }

  async create(userdto) {
    const sql = `INSERT INTO User (${this.createUser}) VALUES (?, ?, ?, ?, ?)`;
    await execute(sql, [
      userdto.id,
      userdto.name,
      userdto.email,
      userdto.password,
      userdto.phone,
    ]);
  }

  async findOnebyId(id) {
    const sql = `SELECT ${this.responseUser} FROM User WHERE user_id = ?`;
    return execute(sql, [id]);
  }

  async findOnebyEmail(email) {
    const sql = `SELECT ${this.responseUser} FROM User WHERE email = ?`;
    return execute(sql, [email]);
  }
}

const userRepository = new UserRepository();

export { userRepository };
