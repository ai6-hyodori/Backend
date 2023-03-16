import { Router } from 'express';
import { facilityService } from '../services/facility.service';

const facilityController = Router();

// 전체 문화시설 조회 (페이징)
facilityController.get('/', async(req, res, next) => {
    try {
        const page = parseInt(req.query.page || '1');
        const pageSize = parseInt(req.query.pageSize || '10');
        const offset = (page - 1) * pageSize;

        const facilities = await facilityService.findAll(pageSize, offset);
        res.status(200).json({ data: facilities });
    } catch (error) {
        next(error);
    }
});

// 문화시설 이름 검색을 통한 조회
facilityController.get('/search', async(req, res, next) => {
    try {
        const page = parseInt(req.query.page || '1');
        const pageSize = parseInt(req.query.pageSize || '10');
        const query = req.query.query;
        const offset = (page - 1) * pageSize;

        const facilities = await facilityService.findBySearch(
            pageSize,
            offset,
            query,
        );
        res.status(200).json({ data: facilities });
    } catch (error) {
        next(error);
    }
});

// 특정 문화시설 조회
facilityController.get('/:facility_id', async(req, res, next) => {
    try {
        const { facility_id } = req.params;
        const facility = await facilityService.findOneById(facility_id);
        res.status(200).json({ data: facility });
    } catch (error) {
        next(error);
    }
});

export { facilityController };