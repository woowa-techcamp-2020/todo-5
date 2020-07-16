import { mysql } from '../modules/database/mysql';
import { CardDTO } from '../../../shared/dto';


class Card {
  constructor() {}
  static async create(card: CardDTO.CREATE) {
    try {
      const cardData = await mysql.connect((con: any) => {
        return con.query(`INSERT INTO card (order_weight, user_id, user_name, create_date, last_update, topic_id, card_title ,content) 
        VALUES('${card.order_weight}', '${card.user_id}', '${card.user_name}', '${card.create_date}', '${card.last_update}', '${card.topic_id}', '${card.card_title}', '${card.content}')`)
      });
      return card;
    } catch (err) {
      throw err;
    }
  }

  static async getAllBytopic(topic_id: string) {
    const cardData = [];
    try {
      // cardData = await mysql.connect((con: any) => )
    } catch (err) {
      throw err;
    }
  }

  static async update() {
    // 내용이랑 아이디만 가져오면 되나?
  }

  static async delete(card_id: string) {
    // 삭제하기 
  }

}

export default Card;
