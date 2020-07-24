import Topic from '../topic';
import LoadingBar from '../loadingbar';
import { ORDER_WEIGHT } from '../../utils';
import { $inputTextModal } from '../modal';
import { TopicApi, ActivityApi } from '../../api';
import store from '../../store';
import { ActivityDTO } from '../../../../shared/dto';

class Content extends HTMLElement {
	private state: { service_id: number };
	private topics!: Array<typeof Topic>;
	private topicsMap: Map<number, string>;
	private loadingBar: typeof LoadingBar;

	constructor(service_id: number) {
		super();
		this.state = { service_id };
		this.topics = [];
		this.topicsMap = new Map();
		this.loadingBar = new LoadingBar();
	}

	async connectedCallback() {
		this.render();
		this.listener();
		this.init();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
		this.listener();
	}

	private render() {
		this.innerHTML = `
		<div class="content-container">
			<div class="content"></div>
			<div class="new-topic">
				<div class="new-topic-button">
					Add Column
				</div>
			</div>
		</div>`;
	}

	private listener() {
		const newTopicButton = this.querySelector('.new-topic-button') as HTMLElement;
		newTopicButton.addEventListener('click', (e) => this.openColumnAddModal(e));
	}

	private async init() {
		const contentContainer = this.querySelector('.content-container') as HTMLElement;

		contentContainer.appendChild(this.loadingBar);
		this.loadingBar.open();

		await this.getTopics();

		const contentTag = this.querySelector('.content') as HTMLElement;
		this.topics.forEach((topic: typeof Topic) => {
			contentTag.appendChild(topic);
			this.topicsMap.set(topic.getTopicId(), topic.getTopicTitle());
		});

		setTimeout(() => {
			this.loadingBar.close();
		}, 1000);
	}

	private openColumnAddModal(e: Event) {
		$inputTextModal.open(
			{
				title: 'Add Column',
				content: '',
				resolve: 'Add',
				reject: 'Cancel',
			},
			(c: string) => this.addNewTopic(c)
		);
	}

	private async addNewTopic(topic_title: string) {
		const contentTag = this.querySelector('.content') as HTMLElement;
		const lastItem = this.topics[this.topics.length - 1];
		const nextOrderWeight = this.topics.length
			? lastItem.getOrderWeight() + ORDER_WEIGHT
			: ORDER_WEIGHT;
		const body = {
			service_id: this.state.service_id,
			topic_title: topic_title,
			order_weight: nextOrderWeight,
			user_id: store.getState('user_id'),
		};

		try {
			const res = await TopicApi.create(body);
			const activity: ActivityDTO.TOPICADD = {
				action: ActivityDTO.Action.TOPICADD,
				service_id: store.getState('service_id'),
				user_id: store.getState('user_id'),
				to_topic: body.topic_title,
			};

			const newTopic = new Topic(res.result);
			contentTag.appendChild(newTopic);
			this.topics.push(newTopic);
			this.topicsMap.set(newTopic.getTopicId(), newTopic.getTopicTitle());

			await ActivityApi.topicAdd(activity);
			store.getState('newActivity')();
		} catch (e) {
			console.error(e);
			alert('추가에 실패하였습니다.');
		}
	}

	private async getTopics() {
		try {
			const response = await TopicApi.getAll(this.state.service_id);
			const sortedTopics = [...response.result];
			sortedTopics.sort((a: typeof Topic, b: typeof Topic) => a.order_weight - b.order_weight);
			sortedTopics.forEach((topic) => this.topics.push(new Topic(topic)));
		} catch (err) {
			console.error('Error getting documents', err);
		}
	}

	public getTopicTitleFromId(topic_id: number): string {
		return this.topicsMap.has(topic_id)
			? (this.topicsMap.get(topic_id) as string)
			: 'No Title Topic';
	}
}

window.customElements.define('content-element', Content);

export default customElements.get('content-element');
