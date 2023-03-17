import { execute } from '../../config/db.config';

export class FacilityRepository {
    // 전체 문화시설 조회
    async getAll(pageSize, offset) {
        const sql = `SELECT * FROM Facility LIMIT ${pageSize} OFFSET ${offset}`;

        return execute(sql);
    }

    // 문화시설 조회 (시설 이름 검색)
    async findBySearch(pageSize, offset, query) {
        const sql = `SELECT * FROM Facility WHERE fac_name LIKE "%${query}%" LIMIT ${pageSize} OFFSET ${offset}`;

        return execute(sql);
    }

    // 문화시설 조회 (자치구,  주제분류 필터링)
    async findByFilter(pageSize, offset, district, subjcode) {
        let sql;

        if (district === '전체' && subjcode === '전체') {
            sql = `SELECT * FROM Facility LIMIT ${pageSize} OFFSET ${offset}`;
        } else if (district === '전체' || subjcode === '전체') {
            sql = `SELECT * FROM Facility WHERE district="${district}" OR subjcode="${subjcode}" LIMIT ${pageSize} OFFSET ${offset}`;
        } else {
            sql = `SELECT * FROM Facility WHERE district="${district}" AND subjcode="${subjcode}" LIMIT ${pageSize} OFFSET ${offset}`;
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