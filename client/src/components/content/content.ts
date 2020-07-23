import Topic from '../topic';
import { ORDER_WEIGHT, DUMMY_USER } from '../../api/utils';
import { $inputTextModal } from '../modal';
import { TopicApi, ActivityApi } from '../../api';
import store from '../../store';
import { ActivityDTO } from '../../../../shared/dto';

interface ContentInterface {
	service_id: string;
}

class Content extends HTMLElement {
	private state: ContentInterface;
	private topics!: Array<typeof Topic>;

	constructor(data: ContentInterface) {
		super();
		this.state = data;
		this.topics = [];
	}

	async connectedCallback() {
		await this.getTopics();
		this.render();
		const contentTag = this.querySelector('.content') as HTMLElement;
		this.topics.forEach((topic: typeof Topic) => contentTag.appendChild(topic));
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = `<div class="content"></div>
		<div class="new-topic">
			<div class="new-topic-button">
				Add Column
			</div>
		</div>`;
		this.listener();
	}

	listener() {
		const newTopicButton = this.querySelector('.new-topic-button') as HTMLElement;
		newTopicButton.addEventListener('click', (e) => {
			$inputTextModal.open(
				{
					title: 'Edit',
					content: '',
					resolve: 'Add',
					reject: 'Cancel',
				},
				async (c: string) => this.addNewTopic(c)
			);
		});
	}

	private async addNewTopic(topic_title: string) {
		const contentTag = this.querySelector('.content') as HTMLElement;
		const lastItem = this.topics[this.topics.length - 1];
		const nextOrderWeight = this.topics.length
			? lastItem.getOrderWeight() + ORDER_WEIGHT
			: ORDER_WEIGHT;
		const body = {
			service_id: parseInt(this.state.service_id),
			topic_title: topic_title,
			order_weight: nextOrderWeight,
			user_id: DUMMY_USER,
		};

		try {
			const res = await TopicApi.create(body);
			const activity: ActivityDTO.TOPICADD = {
				action: ActivityDTO.Action.TOPICADD,
				service_id: store.getState('service_id'),
				user_id: store.getState('user_id'),
				uid: store.getState('uid'),
				to_topic: body.topic_title,
			};
			const activityResult = await ActivityApi.topicAdd(activity);
			console.log('success');
			const newTopic = new Topic(res.result);
			contentTag.appendChild(newTopic);
			this.topics.push(newTopic);
		} catch (e) {
			alert('추가에 실패하였습니다.');
		}
	}

	private async getTopics() {
		try {
			const response = await TopicApi.getAll(this.state.service_id);
			const sortedTopics = [...response.result];
			sortedTopics.sort((a: typeof Topic, b: typeof Topic) => a.order_weight - b.order_weight);
			await sortedTopics.forEach((topic) => this.topics.push(new Topic(topic)));
		} catch (err) {
			console.error('Error getting documents', err);
		}
	}
}

window.customElements.define('content-element', Content);

export default customElements.get('content-element');

export { ContentInterface, Content };
