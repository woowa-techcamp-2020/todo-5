interface CREATE {
	order_weight: number;
	service_id: number;
	topic_title: string;
}

interface RESPONSE {
	topic_id: number;
	order_weight: number;
	service_id: number;
	topic_title: string;
}

interface UPDATE_TITLE {
	topic_id: number;
	topic_title: string;
}

interface GET {
	service_id: number;
}

export { CREATE, UPDATE_TITLE, GET, RESPONSE };
