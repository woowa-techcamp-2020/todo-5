import { mysql } from '../modules/database/mysql';
import { TopicDTO } from '../../../shared/dto';

class Topic {
  constructor() {}
  static async create(topic: TopicDTO.CREATE) {
    try {
      const topicData = await mysql.connect((con: any) => {
        return con.query(`INSERT INTO topic (order_weight, service_id, topic_title, removed) VALUES ('${topic.order_weight}', '${topic.service_id}', '${topic.topic_title}', '${topic.removed}')`)
      });
      return topic;
    } catch (err) {
      throw err;
    }
  }

  static async update(topic: TopicDTO.UPDATE) {
    try {
      const topicData = await mysql.connect((con: any) => {
        return con.query(`UPDATE topic SET order_weight = '${topic.order_weight}', topic_title = '${topic.topic_title}' WHERE topic_id = '${topic.topic_id}'`)
      });
      return topic;
    } catch (err) {
      throw err;
    }
  }

  static async delete(topic: TopicDTO.UPDATE) {
    try {
      const topicData = await mysql.connect((con: any) => {
        return con.query(`UPDATE topic SET removed = '${1}' WHERE topic_id = '${topic.topic_id}'`)
      });
      return topic;
    } catch (err) {
      throw err;
    }
  }

  static async getTopicsByServiceId(serviceId: string) {
    // 필요하지 remove false, column_id보고 데려오면 되는건가?
    let topicData;
		try {
			topicData = await mysql.connect((con: any) =>
				con.query(`SELECT * FROM topic WHERE service_id = '${serviceId}'`)
      );
      return [...topicData][0];
		} catch (err) {
			throw err;
    }

  }
}

export default Topic;