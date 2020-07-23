interface CREATE {
	order_weight: number;
	user_id: number;
	content: string;
	topic_id: number;
}

interface RESPONSE {
	card_id: number;
	order_weight: number;
	user_id: number;
	content: string;
	create_date: number;
	last_update: number;
	topic_id: number;
}

interface UPDATE {
	card_id: number;
	content: string;
}

interface UPDATE_POSITION {
	card_id: number;
	order_weight: number;
	topic_id: number;
}

export { CREATE, UPDATE, RESPONSE, UPDATE_POSITION };
