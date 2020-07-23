interface RESPONSE_TOPIC_ADD {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	service_id: number;
	// uid: string;
	to_topic: string;
}

interface RESPONSE_TOPIC_MOVE {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	service_id: number;
	// uid: string;
}

interface RESPONSE_TOPIC_REMOVE {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	service_id: number;
	// uid: string;
	from_topic: string;
}

interface RESPONSE_TOPIC_UPDATE {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	service_id: number;
	// uid: string;
}

interface RESPONSE_ADD extends RESPONSE_TOPIC_ADD {
	card_id: number;
	card_title: string;
}

interface RESPONSE_MOVE extends RESPONSE_TOPIC_MOVE {
	card_id: number;
	card_title: string;
	from_topic: string;
	to_topic: string;
}

interface RESPONSE_REMOVE extends RESPONSE_TOPIC_REMOVE {
	card_id: number;
	card_title: string;
}

interface RESPONSE_UPDATE extends RESPONSE_TOPIC_UPDATE {
	card_id: number;
	card_title: string;
}

enum Action {
	ADD = 'added', // to
	REMOVE = 'removed', // from
	UPDATE = 'updated', // x
	MOVE = 'moved', // to, from
	TOPICADD = 'added column', // to
	TOPICREMOVE = 'removed column', // from
	TOPICUPDATE = 'updated column', // x
	TOPICMOVE = 'moved column',
}

interface TOPICADD {
	action: Action.TOPICADD;
	service_id: number;
	uid: string;
	user_id: number;
	to_topic: string;
}

interface TOPICREMOVE {
	action: Action.TOPICREMOVE;
	service_id: number;
	user_id: number;
	from_topic: string;
}

interface TOPICUPDATE {
	action: Action.TOPICUPDATE;
	service_id: number;
	user_id: number;
}

interface TOPICMOVE {
	action: Action.TOPICMOVE;
	service_id: number;
	user_id: number;
}

interface ADD {
	action: Action.ADD;
	card_id: number;
	uid: string;
	card_title: string;
	service_id: number;
	user_id: number;
	to_topic: string;
}

interface REMOVE {
	action: Action.REMOVE;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	user_id: number;
	from_topic: string;
}

interface UPDATE {
	action: Action.UPDATE;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	user_id: number;
}

interface MOVE {
	action: Action.MOVE;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	user_id: number;
	to_topic: string;
	from_topic: string;
}

interface ACTIVE {
	action: Action;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	user_id: number;
	to_topic?: string;
	from_topic?: string;
}

type ActionType = ADD | REMOVE | UPDATE | MOVE | TOPICADD | TOPICREMOVE | TOPICUPDATE | TOPICMOVE;

export {
	ACTIVE,
	Action,
	ADD,
	UPDATE,
	REMOVE,
	MOVE,
	ActionType,
	RESPONSE_ADD,
	RESPONSE_UPDATE,
	RESPONSE_MOVE,
	RESPONSE_REMOVE,
	RESPONSE_TOPIC_ADD,
	RESPONSE_TOPIC_UPDATE,
	RESPONSE_TOPIC_MOVE,
	RESPONSE_TOPIC_REMOVE,
	TOPICADD,
	TOPICMOVE,
	TOPICREMOVE,
	TOPICUPDATE,
};
