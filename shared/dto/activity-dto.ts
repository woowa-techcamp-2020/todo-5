interface RESPONSE_ADD {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	to_topic: string;
}

interface RESPONSE_MOVE {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	from_topic: string;
	to_topic: string;
}

interface RESPONSE_REMOVE {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	from_topic: string;
}

interface RESPONSE_UPDATE {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
}

enum Action {
	ADD = 'added', // to
	REMOVE = 'removed', // from
	UPDATE = 'updated', // x
	MOVE = 'moved', // to, from
}

interface ADD {
	action: Action.ADD;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
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

type ActionType = ADD | REMOVE | UPDATE | MOVE;

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
};
