interface CREATE {
  order_weight: number;
  service_id: number;
  topic_title: string;
  removed: number;
}

interface TOPIC {
  topic_id: number;
  order_weight: number;
  service_id: number;
  removed: number;
  topic_title: string;
}

interface UPDATE {
  topic_id: number;
  order_weight: number;
  service_id: number;
  removed: number;
  topic_title: string;
}

interface GET {
  service_id: number;
}

export default TOPIC;


export { CREATE, UPDATE, GET };