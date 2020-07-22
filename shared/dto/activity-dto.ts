interface RESPONSE_ADD {
	activity_id: number;
	user_id: number;
	create_date: number;
	action: Action;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	to_topic: number;
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
	from_topic: number;
	to_topic: number;
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
	from_topic: number;
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
	ADD = 0, // to
	REMOVE = 1, // from
	UPDATE = 2, // x
	MOVE = 3, // to, from
}

interface ADD {
	action: Action.ADD;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	user_id: number;
	to_topic: number;
}

interface REMOVE {
	action: Action.REMOVE;
	card_id: number;
	card_title: string;
	service_id: number;
	uid: string;
	user_id: number;
	from_topic: number;
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
	to_topic: number;
	from_topic: number;
}

type ActionType = ADD | REMOVE | UPDATE | MOVE;

export {
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
