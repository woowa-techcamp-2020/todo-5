interface ACTIVITY {
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

enum Action {
   ADD=0, // to
   REMOVE=1,  // from
   UPDATE=2,  // x
   MOVE=3 // to, from
};

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

type actionType = ADD | REMOVE | UPDATE | MOVE;

export default ACTIVITY;
export { Action, ADD, UPDATE, REMOVE, MOVE, actionType };
