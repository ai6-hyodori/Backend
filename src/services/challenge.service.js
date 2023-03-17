import { challengeRepository } from '../db/repositories/Challenge';

class ChallengeService {
  constructor(challengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async create(dto) {
    await challengeRepository.create(dto);
  }
}

const challengeService = new ChallengeService(challengeRepository);

export { challengeService };
