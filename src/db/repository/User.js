// noinspection JSUnresolvedVariable

import { execute } from '../../config/db.config';

export class UserRepository {
  async getAll() {
    const sql = `SELECT * FROM User`;
    return execute(sql);
  }

  async create(userdto) {
    const sql = `INSERT INTO User (user_id, name, email, password, phone) VALUES (?, ?, ?, ?, ?)`;
    return execute(sql, [
      userdto.id,
      userdto.name,
      userdto.email,
      userdto.password,
      userdto.phone,
    ]);
  }

  async findOnebyId(id) {
    const sql = `SELECT * FROM User WHERE user_id = ?`;
    return execute(sql, [id]);
  }

  async findOnebyEmail(email) {
    const sql = `SELECT * FROM User WHERE email = ?`;
    return execute(sql, [email]);
  }
}

const userRepository = new UserRepository();

export { userRepository };
