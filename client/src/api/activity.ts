import { url, Options } from './utils';
import { ActivityDTO } from '../../../shared/dto';

const limit = 20;

class ActivityApi {
	static async create(body: ActivityDTO.ACTIVE): Promise<any> {
		try {
			const result = await fetch(`${url}/api/activity`, Options.POST(body));
			const json = await result.json();
			return json;
		} catch (error) {
			console.error('err', error);
			throw error;
		}
	}

	static async add(body: ActivityDTO.ADD) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async update(body: ActivityDTO.UPDATE) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async move(body: ActivityDTO.MOVE) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async delete(body: ActivityDTO.REMOVE) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async topicAdd(body: ActivityDTO.TOPICADD) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async topicDelete(body: ActivityDTO.TOPICREMOVE) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async topicUpdate(body: ActivityDTO.TOPICUPDATE) {
		const result = await ActivityApi.create(body);
		return result;
	}

	static async getActivitiesByServiceId(serviceId: number) {
		try {
			const result = await fetch(`${url}/api/activity/${serviceId}`, Options.GET());
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async getActivitiesByPagination(
		serviceId: string,
		max: number,
		page: number
	): Promise<any> {
		try {
			const result = await fetch(
				`${url}/api/activity/${serviceId}/${max - (page + 1) * limit}/${max - page * limit}`,
				Options.GET()
			);
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async getMaxpageNumber(serviceId: string) {
		try {
			const result = await fetch(`${url}/api/activity/page/${serviceId}`, Options.GET());
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}
}

export default ActivityApi;
