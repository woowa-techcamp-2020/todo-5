import { mysql } from '../modules/database/mysql';
import { ServiceDTO } from '../../../shared/dto';

class Service {
	constructor() {}
	static async create(service: ServiceDTO.CREATE) {
		try {
			const serviceData = await mysql.connect((con: any) => {
				return con.query(`INSERT INTO service (service_name) VALUES ('${service.service_name}')`);
			});
			const service_id = serviceData[0].insertId;
			const result: ServiceDTO.RESPONSE = { ...service, service_id };
			return result;
		} catch (err) {
			throw err;
		}
	}
}

export default Service;
