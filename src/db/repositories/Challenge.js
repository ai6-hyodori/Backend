import { execute } from '../../config/db.config';

class ChallengeRepository {
  async create(dto) {
    const sql = `INSERT INTO Challenge (
            title, 
            description, 
            content,
            image, 
            recruit_person, 
            recruit_start, 
            recruit_end, 
            progress_start, 
            progress_end
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await execute(sql, [
      dto.title,
      dto.description,
      dto.content,
      dto.imagePath,
      dto.recruit_person,
      dto.recruit_start,
      dto.recruit_end,
      dto.progress_start,
      dto.progress_end,
    ]);
  }
}

const challengeRepository = new ChallengeRepository();

export { challengeRepository };
