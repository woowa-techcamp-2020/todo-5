import { mysql } from '../modules/database/mysql';
import { CardDTO } from '../../../shared/dto';

class Card {
	constructor() {}
	static async create(card: CardDTO.CREATE) {
		try {
			const cardData = await mysql.connect((con: any) => {
				const date = Math.floor(Date.now() / 1000);
				return con.query(`INSERT INTO card (order_weight, user_id, user_name, create_date, last_update, topic_id ,content) 
        VALUES('${card.order_weight}', '${card.user_id}', '${card.user_name}', '${date}', '${date}', '${card.topic_id}', '${card.content}')`);
			});
			return card;
		} catch (err) {
			throw err;
		}
	}

	static async getCardsBytopicId(topicId: string) {
		let cardData;
		try {
			cardData = await mysql.connect((con: any) =>
				con.query(`SELECT * FROM card WHERE topic_id = '${topicId}' AND removed = '${0}'`)
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
}

export default Card;
