interface CREATE {
	order_weight: number;
	user_id: number;
	user_name: string;
	content: string;
	topic_id: number;
}

interface CARD {
	card_id: number;
	order_weight: number;
	user_id: number;
	content: string;
	create_date: number;
	last_update: number;
	topic_id: number;
	user_name: string;
}

interface UPDATE {
	card_id: number;
	content: string;
}

export default CARD;

export { CREATE, UPDATE };
