import { execute } from '../../config/db.config';

export class FacilityRepository {
    // 전체 문화시설 조회
    async getAll(pageSize, offset, search) {
        let sql;
        if (!search) {
            sql = `SELECT * FROM Facility LIMIT ${pageSize} OFFSET ${offset}`;
        } else {
            sql = `SELECT * FROM Facility WHERE fac_name LIKE "%${search}%" LIMIT ${pageSize} OFFSET ${offset}`;
        }

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