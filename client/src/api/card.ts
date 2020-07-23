import { url, Options } from '../utils';
import { CardDTO } from '../../../shared/dto';

class CardApi {
	static async create(body: CardDTO.CREATE): Promise<any> {
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

	static async update(body: CardDTO.UPDATE): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card/update`, Options.PATCH(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async updatePosition(body: CardDTO.UPDATE_POSITION): Promise<any> {
		try {
			const result = await fetch(`${url}/api/card/update-position`, Options.PATCH(body));
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
