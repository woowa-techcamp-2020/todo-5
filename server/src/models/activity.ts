import { mysql } from '../modules/database/mysql';
import { ActivityDTO } from '../../../shared/dto';

class Activity {
	constructor() {}
	static async create(activity: ActivityDTO.ActionType) {
		try {
			const create_date = Math.floor(Date.now() / 1000);
			const activityData = await mysql.connect((con: any) => {
				switch (activity.action) {
					case ActivityDTO.Action.ADD:
						return con.query(`INSERT INTO activity (action, card_id, service_id, user_id, to_topic, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.service_id}', '${activity.user_id}', '${activity.to_topic}', '${create_date}')`);
					case ActivityDTO.Action.REMOVE:
						return con.query(`INSERT INTO activity (action, card_id, service_id, user_id, from_topic, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.service_id}', '${activity.user_id}', '${activity.from_topic}', '${create_date}')`);
					case ActivityDTO.Action.UPDATE:
						return con.query(`INSERT INTO activity (action, card_id, service_id, user_id, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.service_id}', '${activity.user_id}', '${create_date}')`);
					case ActivityDTO.Action.MOVE:
						return con.query(`INSERT INTO activity (action, card_id, service_id, user_id, from_topic, to_topic, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.service_id}', '${activity.user_id}', '${activity.from_topic}', '${activity.to_topic}', '${create_date}')`);
					//
					case ActivityDTO.Action.TOPICADD:
						return con.query(`INSERT INTO activity (action, service_id, user_id, to_topic, create_date)
					  VALUES('${activity.action}', '${activity.service_id}', '${activity.user_id}', '${activity.to_topic}', '${create_date}')`);

					case ActivityDTO.Action.TOPICREMOVE:
						return con.query(`INSERT INTO activity (action, service_id, user_id, from_topic, create_date)
					  VALUES('${activity.action}', '${activity.service_id}', '${activity.user_id}', '${activity.from_topic}', '${create_date}')`);

					case ActivityDTO.Action.TOPICUPDATE:
						return con.query(`INSERT INTO activity (action, service_id, user_id, to_topic, create_date)
					  VALUES('${activity.action}', '${activity.service_id}', '${activity.user_id}', '${activity.to_topic}', ${create_date}')`);

					case ActivityDTO.Action.TOPICMOVE:
						return con.query(`INSERT INTO activity (action, service_id, user_id, from_topic, create_date)
					  VALUES('${activity.action}', '${activity.service_id}', '${activity.user_id}', '${activity.from_topic}', '${create_date}')`);
				}
			});
			const activity_id = activityData[0].insertId;
			switch (activity.action) {
				case ActivityDTO.Action.ADD:
					const responseAdd: ActivityDTO.RESPONSE_ADD = { ...activity, activity_id, create_date };
					return responseAdd;
				case ActivityDTO.Action.MOVE:
					const response_move: ActivityDTO.RESPONSE_MOVE = {
						...activity,
						activity_id,
						create_date,
					};
					return response_move;
				case ActivityDTO.Action.REMOVE:
					const response_remove: ActivityDTO.RESPONSE_REMOVE = {
						...activity,
						activity_id,
						create_date,
					};
					return response_remove;
				case ActivityDTO.Action.UPDATE:
					const response_update: ActivityDTO.RESPONSE_UPDATE = {
						...activity,
						activity_id,
						create_date,
					};
					return response_update;

				case ActivityDTO.Action.TOPICADD:
					const response_topic_add: ActivityDTO.RESPONSE_TOPIC_ADD = {
						...activity,
						activity_id,
						create_date,
					};
					console.log('qwer', response_topic_add);
					return response_topic_add;
				case ActivityDTO.Action.TOPICMOVE:
					const response_topic_move: ActivityDTO.RESPONSE_TOPIC_MOVE = {
						...activity,
						activity_id,
						create_date,
					};
					return response_topic_move;
				case ActivityDTO.Action.TOPICREMOVE:
					const response_topic_remove: ActivityDTO.RESPONSE_TOPIC_REMOVE = {
						...activity,
						activity_id,
						create_date,
					};
					return response_topic_remove;
				case ActivityDTO.Action.TOPICUPDATE:
					const response_topic_update: ActivityDTO.RESPONSE_TOPIC_UPDATE = {
						...activity,
						activity_id,
						create_date,
					};
					return response_topic_update;
			}
		} catch (err) {
			throw err;
		}
	}

	static async getActivitiesByServiceId(serviceId: string) {
		let activityData;
		try {
			activityData = await mysql.connect(async (con: any) => {
				const rs1 = await con.query(
					`SELECT activity_id, a.user_id, u.uid, a.create_date, action, a.card_id, c.content, a.service_id from_topic, to_topic from activity a inner join user u on a.user_id = u.user_id inner join card c on a.card_id = c.card_id where a.service_id = ${serviceId} order by a.create_date DESC;`
				);
				const rs2 = await con.query(
					`SELECT activity_id, a.user_id, u.uid, a.create_date, action, a.service_id from_topic, to_topic from activity a inner join user u on a.user_id = u.user_id where a.service_id = ${serviceId} and a.card_id is null order by a.create_date DESC`
				);
				const data = [...rs1[0], ...rs2[0]].sort((a, b) => b.create_date - a.create_date);
				return data;
			});
			return activityData;
		} catch (err) {
			throw err;
		}
	}
}

export default Activity;
