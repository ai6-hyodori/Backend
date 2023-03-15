import { execute } from '../../config/db.config';

export class FacilityRepository {
  // 전체 문화시설 조회
  async getAll() {
    // 필요한 컬럼만 사용: 프론트와 협의
    const sql = `
                    SELECT Category.category_id, facility_id, category_name, name,class, description, image, postal, address, detail_address, homepage, fee, closed_date, start_time, end_time
                    FROM Facility 
                    `;

    return execute(sql);
  }

  // 특정 문화시설 조회
  async findOneById(facility_id) {
    const sql = `
                    SELECT Category.category_id, facility_id, category_name, name,class, description, image, postal, address, detail_address, homepage, fee, closed_date, start_time, end_time
                    FROM Facility
                    LEFT JOIN Category
                    ON Facility.category_id = Category.category_id
                    WHERE facility_id = ?
                    `;

    return execute(sql, [facility_id]);
  }

  // 카테고리 별 문화시설 조회
  async findByCategory(category_id) {
    const sql = `
                    SELECT facility_id, name, class, description, image, postal, address, detail_address, homepage, fee, closed_date, start_time, end_time
                    FROM Facility
                    WHERE category_id = ?
                    `;

    return execute(sql, [category_id]);
  }
}

const facilityRepository = new FacilityRepository();

export { facilityRepository };
