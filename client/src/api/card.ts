import { url, Options } from './utils';

class CardApi {
	static create(body: {}): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/card`, Options.POST(body))
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static delete(cardId: number): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/card/delete/${cardId}`, Options.PATCH({}))
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static update(body: {}): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/card/update`, Options.PATCH(body))
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static async getAll(topicId: number): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/card/${topicId}`, Options.GET())
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default CardApi;
