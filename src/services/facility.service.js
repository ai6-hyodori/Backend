import { facilityRepository } from '../db/repositories/Facility';
import { CustomError } from '../middlewares/filter';
import commonErrors from '../middlewares/filter/error/commonError';

class FacilityService {
    constructor(facilityRepository) {
        this.facility = facilityRepository;
    }

    // 문화시설 조회
    async getFacilities() {
        const facilities = await facilityRepository.getAll();

        return facilities;
    }

    // 특정 문화시설 조회
    async getFacilityById(facility_id) {
        const facility = await facilityRepository.findOneById(facility_id);

        if (!facility) {
            throw new CustomError(404, commonErrors.resourceNotFoundError);
        }

        return facility;
    }

    // 카테고리 별 문화시설 조회
    async getFacilitiesByCategory(category_id) {
        const facilities = await facilityRepository.findByCategory(category_id);

        if (!facilities) {
            throw new CustomError(404, commonErrors.resourceNotFoundError);
        }

        return facility;
    }
}

const facilityService = new FacilityService(facilityRepository);

export { facilityService };