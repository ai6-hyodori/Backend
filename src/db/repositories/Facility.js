import { execute } from '../../config/db.config';

export class FacilityRepository {
    // 전체 문화시설 조회
    async getAll(pageSize, offset) {
        const sql = `SELECT * FROM Facility LIMIT ${pageSize} OFFSET ${offset}`;

        return execute(sql);
    }

    // 문화시설 이름 검색을 통한 조회
    async findBySearch(pageSize, offset, query) {
        const sql = `SELECT * FROM Facility WHERE fac_name LIKE "%${query}%" LIMIT ${pageSize} OFFSET ${offset}`;

        return execute(sql);
    }

    // 특정 문화시설 조회
    async findById(facility_id) {
        const sql = `SELECT * FROM Facility WHERE facility_id = ? `;
        return execute(sql, [facility_id]);
    }
}

const facilityRepository = new FacilityRepository();

export { facilityRepository };