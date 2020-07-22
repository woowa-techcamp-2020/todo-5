import { url, Options } from './utils';

class TopicApi {
	static create(body: {}): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/topic`, Options.POST(body))
				.then((res) => {
					resolve(res);
				})
				.catch((rej) => {
					reject(rej);
				});
		});
	}

	static delete(topicId: number): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/topic/delete/${topicId}`, Options.PATCH({}))
				.then((res) => resolve(res))
				.catch((err) => reject(err));
		});
	}
	static update(body: {}): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/topic/update`, Options.PATCH(body))
				.then((res) => resolve(res))
				.catch((err) => reject(err));
		});
	}

	static getAll(serviceId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`${url}/api/topic/${serviceId}`, Options.GET())
				.then((res) => resolve(res))
				.catch((err) => reject(err));
		});
	}
}

export default TopicApi;
