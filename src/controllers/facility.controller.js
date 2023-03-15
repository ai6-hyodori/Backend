import { Router } from 'express';
import { facilityService } from '../services/facility.service';

const facilityController = Router();

// 전체 문화시설 조회
facilityController.get('/', async(req, res, next) => {
    try {
        const facilities = await facilityService.getFacilities();
        res.status(200).json({ data: facilities });
    } catch (error) {
        next(error);
    }
});

// 특정 문화시설 조회
facilityController.get('/:facility_id', async(req, res, next) => {
    try {
        const { facility_id } = req.params;
        const facility = await facilityService.getFacilityById(facility_id);
        res.status(200).json({ data: facility });
    } catch (error) {
        next(error);
    }
});

// 카테고리 별 문화시설 조회
facilityController.get('/:category_id', async(req, res, next) => {
    try {
        const { category_id } = req.params;
        const facilities = await facilityService.getFacilitiesByCategory(
            category_id,
        );
        res.status(200).json({ data: facilities });
    } catch (error) {
        next(error);
    }
});

export { facilityController };