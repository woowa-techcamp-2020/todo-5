import { url, Options } from '../utils';
import { TopicDTO } from '../../../shared/dto';

class TopicApi {
	static async create(body: TopicDTO.CREATE): Promise<any> {
		try {
			const result = await fetch(`${url}/api/topic`, Options.POST(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async delete(topicId: number): Promise<any> {
		try {
			const result = await fetch(`${url}/api/topic/delete/${topicId}`, Options.PATCH({}));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async update(body: TopicDTO.UPDATE_TITLE): Promise<any> {
		try {
			const result = await fetch(`${url}/api/topic/update`, Options.PATCH(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async getAll(serviceId: string): Promise<any> {
		try {
			const result = await fetch(`${url}/api/topic/${serviceId}`, Options.GET());
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}
}

export default TopicApi;
