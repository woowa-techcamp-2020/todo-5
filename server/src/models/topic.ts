import { mysql } from '../modules/database/mysql';
import { TopicDTO } from '../../../shared/dto';

class Topic {
	constructor() {}
	static async create(topic: TopicDTO.CREATE) {
		try {
			const topicData = await mysql.connect((con: any) =>
				con.query(
					`INSERT INTO topic (order_weight, service_id, topic_title) VALUES ('${topic.order_weight}', '${topic.service_id}', '${topic.topic_title}')`
				)
			);
			const topic_id = topicData[0].insertId;
			const result: TopicDTO.default = { ...topic, topic_id };
			return result;
		} catch (err) {
			throw err;
		}
	}

	static async update(topic: TopicDTO.UPDATE) {
		try {
			const topicData = await mysql.connect((con: any) =>
				con.query(
					`UPDATE topic SET topic_title = '${topic.topic_title}' WHERE topic_id = '${topic.topic_id}'`
				)
			);
			return { topic_id: topic.topic_id };
		} catch (err) {
			throw err;
		}
	}

	static async delete(topic_id: number) {
		try {
			const topicData = await mysql.connect((con: any) =>
				con.query(`UPDATE topic SET removed = '${1}' WHERE topic_id = '${topic_id}'`)
			);
			return { topic_id };
		} catch (err) {
			throw err;
		}
	}

	static async getTopicsByServiceId(serviceId: string) {
		let topicData;
		try {
			topicData = await mysql.connect((con: any) =>
				con.query(`SELECT * FROM topic WHERE service_id = '${serviceId}' AND removed = '${0}'`)
			);
			return [...topicData][0];
		} catch (err) {
			throw err;
		}
	}
}

export default Topic;
