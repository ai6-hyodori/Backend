import { execute } from '../../config/db.config';
import { logger } from '../../middlewares/logger/config/logger';
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
      parseInt(dto.recruit_person),
      dto.recruit_start,
      dto.recruit_end,
      dto.progress_start,
      dto.progress_end,
    ]);
  }

  async findOneById(dto) {
    const sql = `SELECT * FROM Challenge WHERE challenge_id = ?`;
    const oneChallengeData = await execute(sql, [dto]);
    return oneChallengeData;
  }

  async updateOneById({ challenge_id, challengeDto }) {
    const sql = `UPDATE Challenge 
    SET 
    title = ?, 
    description =?, 
    content = ?,
    image = ?, 
    recruit_person = ?, 
    recruit_start = ?, 
    recruit_end = ?, 
    progress_start = ?, 
    progress_end = ?
    WHERE challenge_id = ?`;
    await execute(sql, [
      challengeDto.title,
      challengeDto.description,
      challengeDto.content,
      challengeDto.imagePath,
      challengeDto.recruit_person,
      challengeDto.recruit_start,
      challengeDto.recruit_end,
      challengeDto.progress_start,
      challengeDto.progress_end,
      // parseInt(challenge_id),
      challenge_id,
    ]);
  }

  async deleteOneById(challenge_id) {
    const sql = `UPDATE Challenge 
    SET isDeleted = 1
    WHERE challenge_id = ?`;
    await execute(sql, [challenge_id]);
  }

  async findProgressing(dateString) {
    const sql = `SELECT * FROM Challenge
    WHERE progress_start <= ? 
    AND progress_end >= ?
    AND isDeleted = 0`;
    const progressingChallenge = await execute(sql, [dateString, dateString]);
    return progressingChallenge;
  }
  async findRecruiting(dateString) {
    const sql = `SELECT * FROM Challenge
    WHERE recruit_start <= ? 
    AND recruit_end >= ?
    AND isDeleted = 0`;
    const recruitingChallenge = await execute(sql, [dateString, dateString]);
    return recruitingChallenge;
  }
  async findEnded(dateString) {
    const sql = `SELECT * FROM Challenge
    WHERE progress_end < ? 
    AND isDeleted = 0`;
    const endedChallenge = await execute(sql, [dateString]);
    return endedChallenge;
  }
}

const challengeRepository = new ChallengeRepository();

export { challengeRepository };
