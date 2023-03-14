import { execute } from '../../config/db.config';

export class FacilityRepository {
    // 전체 문화시설 조회
    async getAll() {
        const sql = `
                    SELECT * 
                    FROM Facility 
                    LEFT JOIN Category 
                    ON Facility.category_id = Category.category_id
                    `;

        return execute(sql);
    }

    // 특정 문화시설 조회
    async findOneById(facility_id) {
        const sql = `
                    SELECT * 
                    FROM Facility
                    LEFT JOIN Category 
                    ON Facility.category_id = Category.category_id
                    WHERE facility_id = ?
                    `;

        return execute(sql, [facility_id]);
    }
}

const facilityRepository = new FacilityRepository();

export { facilityRepository };