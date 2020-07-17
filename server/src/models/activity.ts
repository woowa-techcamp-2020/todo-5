import { mysql } from '../modules/database/mysql';
import { ActivityDTO } from '../../../shared/dto';

class Activity {
  constructor() {}
  static async create (activity: ActivityDTO.actionType) {
    try {
      const date = Math.floor(Date.now()/ 1000);
      const activityData = await mysql.connect((con: any) => {
        switch(activity.action) {
          case ActivityDTO.Action.ADD:
            return con.query(`INSERT INTO activity (action, card_id, card_title, service_id, uid, user_id, to_topic, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.card_title}', '${activity.service_id}', '${activity.uid}', '${activity.user_id}', '${activity.to_topic}', '${date}')`)
          case ActivityDTO.Action.REMOVE:
            return con.query(`INSERT INTO activity (action, card_id, card_title, service_id, uid, user_id, from_topic, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.card_title}', '${activity.service_id}', '${activity.uid}', '${activity.user_id}', '${activity.from_topic}', '${date}')`)
          case ActivityDTO.Action.UPDATE:
            return con.query(`INSERT INTO activity (action, card_id, card_title, service_id, uid, user_id, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.card_title}', '${activity.service_id}', '${activity.uid}', '${activity.user_id}', '${date}')`)
          case ActivityDTO.Action.MOVE:
            return con.query(`INSERT INTO activity (action, card_id, card_title, service_id, uid, user_id, from_topic, to_topic, create_date) 
            VALUES('${activity.action}', '${activity.card_id}', '${activity.card_title}', '${activity.service_id}', '${activity.uid}', '${activity.user_id}', '${activity.from_topic}', '${activity.to_topic}', '${date}')`)
        }
      });
      return activity;
    } catch (err) {
      throw err;
    }
  }

  static async getActivitiesByServiceId(serviceId: string) {
    let activityData;
    try {
			activityData = await mysql.connect((con: any) =>
        con.query(`SELECT * FROM activity WHERE service_id = '${serviceId}'`)
      );
      return [...activityData][0];
		} catch (err) {
			throw err;
    }
  }
}

export default Activity;

