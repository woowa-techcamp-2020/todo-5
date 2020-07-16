import { mysql } from '../modules/database/mysql';
import { CardDTO } from '../../../shared/dto';

// order_weight: number;
// user_id: number;
// user_name: string;
// content: string;
// create_date: string;
// last_update: string;
// column_id: string;
// card_title: string;



class Card {
  constructor() {}
  static async create(card: CardDTO.CREATE) {
    try {
      const cardData = await mysql.connect((con: any) => {
        return con.query(`INSERT INTO card (order_weight, user_id, user_name, create_date, last_update, column_id, card_title ,content) 
        VALUES('${card.order_weight}', '${card.user_id}', '${card.user_name}', '${card.create_date}', '${card.last_update}', '${card.column_id}', '${card.card_title}', '${card.content}')`)
      });
      return card;
    } catch (err) {
      throw err;
    }
  }

  static async getAllByColumn(column_id: string) {
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
