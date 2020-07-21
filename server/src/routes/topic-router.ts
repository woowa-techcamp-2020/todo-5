import { Router } from 'express';
import { TopicController, UserController } from '../controllers';

const topicRouter = Router();
// topicRouter.route('/:uid').get(UserController.getUserById);
topicRouter.route('/').post(TopicController.create);
topicRouter.route('/update').post(TopicController.update);
topicRouter.route('/delete/:topic_id').patch(TopicController.delete);

topicRouter.route('/').get(TopicController.getTopicsByServiceId);
topicRouter.route('/:service_id').get(TopicController.getTopicsByServiceId);

// topicRouter.route('/:uid').get(TopicController.getTopicsByServiceId);

// topicRouter.route('/:uid').get(TopicController.getTopicsByServiceId);

// post만 세 개인뎅

export default topicRouter;
