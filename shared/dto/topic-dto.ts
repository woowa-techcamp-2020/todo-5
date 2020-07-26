interface CREATE {
	order_weight: number;
	service_id: number;
	topic_title: string;
	user_id: number;
}

interface RESPONSE {
	topic_id: number;
	order_weight: number;
	service_id: number;
	topic_title: string;
	user_id: number;
}

interface UPDATE_TITLE {
	topic_id: number;
	topic_title: string;
	user_id: number;
}

interface GET {
	service_id: number;
}

export { CREATE, UPDATE_TITLE, GET, RESPONSE };
