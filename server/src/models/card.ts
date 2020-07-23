import { mysql } from '../modules/database/mysql';
import { CardDTO } from '../../../shared/dto';

class Card {
	constructor() {}
	static async create(card: CardDTO.CREATE) {
		try {
			const create_date = Math.floor(Date.now() / 1000);
			const last_update = create_date;
			const cardData = await mysql.connect((con: any) =>
				con.query(`INSERT INTO card (order_weight, user_id, create_date, last_update, topic_id ,content) 
        VALUES('${card.order_weight}', '${card.user_id}', '${create_date}', '${last_update}', '${card.topic_id}', '${card.content}')`)
			);
			const card_id = cardData[0].insertId;
			const result: CardDTO.RESPONSE = { ...card, card_id, create_date, last_update };
			return result;
		} catch (err) {
			throw err;
		}
	}

	static async getCardsBytopicId(topicId: string) {
		let cardData;
		try {
			cardData = await mysql.connect((con: any) =>
				con.query(
					`SELECT card_id, order_weight, c.user_id, content, create_date, last_update, topic_id, uid FROM card c INNER JOIN user u ON u.user_id = c.user_id WHERE topic_id = '${topicId}' AND removed = '${0}'`
				)
			);
			return [...cardData][0];
		} catch (err) {
			throw err;
		}
	}

	static async update(card: CardDTO.UPDATE) {
		try {
			const date = Math.floor(Date.now() / 1000);
			const cardData = await mysql.connect((con: any) =>
				con.query(
					`UPDATE card SET last_update = '${date}', content = '${card.content}' WHERE card_id = '${card.card_id}'`
				)
			);
			return { card_id: card.card_id };
		} catch (err) {
			throw err;
		}
	}

	static async updatePosition(card: CardDTO.UPDATE_POSITION) {
		try {
			const last_update = Math.floor(Date.now() / 1000);
			const cardData = await mysql.connect((con: any) =>
				con.query(
					`UPDATE card SET last_update = '${last_update}', topic_id = ${card.topic_id}, order_weight = ${card.order_weight} WHERE card_id = '${card.card_id}'`
				)
			);
			return { ...card, last_update };
		} catch (err) {
			throw err;
		}
	}

	static async delete(card_id: number) {
		try {
			const date = Math.floor(Date.now() / 1000);
			const cardData = await mysql.connect((con: any) =>
				con.query(
					`UPDATE card SET removed = '${1}', last_update = '${date}' WHERE card_id = '${card_id}'`
				)
			);
			return { card_id };
		} catch (err) {
			throw err;
		}
	}

	static async deleteAllByTopicId(topic_id: number) {
		try {
			const date = Math.floor(Date.now() / 1000);
			const cardData = await mysql.connect((con: any) =>
				con.query(
					`UPDATE card SET removed = '${1}', last_update = '${date}' WHERE topic_id = '${topic_id}'`
				)
			);
			return { topic_id };
		} catch (err) {
			throw err;
		}
	}
}

export default Card;
