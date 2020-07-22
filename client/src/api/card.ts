import { url, Options } from './utils';

class CardApi {
	static async create(body: {}): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card`, Options.POST(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async delete(cardId: number): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card/delete/${cardId}`, Options.PATCH({}));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async update(body: {}): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card/update`, Options.PATCH(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async getAll(topicId: number): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card/${topicId}`, Options.GET());
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async deleteAll(topicId: number): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card/delete-all/${topicId}`, Options.PATCH({}));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}
}

export default CardApi;
