import { facilityRepository } from '../db/repositories/Facility';
import { CustomError } from '../middlewares/filter';
import commonErrors from '../middlewares/filter/error/commonError';

class FacilityService {
    constructor(facilityRepository) {
        this.facility = facilityRepository;
    }

    // 문화시설 조회 (페이징)
    async findAll(pageSize, offset, search) {
        const facilities = await facilityRepository.getAll(
            pageSize,
            offset,
            search,
        );

        return facilities;
    }

    // 특정 문화시설 조회
    async findOneById(facility_id) {
        const facility = await facilityRepository.findById(facility_id);

        if (!facility) {
            throw new CustomError(404, commonErrors.resourceNotFoundError);
        }
        return facility[0];
    }
}

const facilityService = new FacilityService(facilityRepository);

export { facilityService };