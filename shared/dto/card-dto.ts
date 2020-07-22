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

export { CREATE, UPDATE, RESPONSE };
