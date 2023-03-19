import { challengeRepository } from '../db/repositories/Challenge';
import { CustomError } from '../middlewares/filter/error/customError';
import commonErrors from '../middlewares/filter/error/commonError';
import { logger } from '../middlewares/logger/config/logger';
class ChallengeService {
  constructor(challengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async create(dto) {
    await challengeRepository.create(dto);
  }

  async findOneById(dto) {
    const oneChallengeData = await challengeRepository.findOneById(dto);
    if (Object.keys(oneChallengeData).length == 0) {
      throw new CustomError(404, commonErrors.resourceNotFoundError);
    }
    return oneChallengeData;
  }

  async updateOneById({ challenge_id, challengeDto }) {
    await challengeRepository.updateOneById({ challenge_id, challengeDto });
  }

  async deleteOneById(challenge_id) {
    await challengeRepository.deleteOneById(challenge_id);
  }

  async findProgressing(dateString) {
    const progressingChallenge = await challengeRepository.findProgressing(
      dateString,
    );
    return progressingChallenge;
  }
  async findRecruiting(dateString) {
    const recruitingChallenge = await challengeRepository.findRecruiting(
      dateString,
    );
    return recruitingChallenge;
  }
  async findEnded(dateString) {
    const endedChallenge = await challengeRepository.findEnded(dateString);
    return endedChallenge;
  }
}

const challengeService = new ChallengeService(challengeRepository);

export { challengeService };
