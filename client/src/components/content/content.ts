import Topic from '../topic';
import { Options, url, ORDER_WEIGHT } from '../../utils';
import { $topicAddModal } from '../modal';

export interface ContentInterface {
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
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		await this.getTopics();
		this.render();
		const contentTag = this.querySelector('.content') as HTMLElement;
		this.topics.forEach((topic: typeof Topic) => contentTag.appendChild(topic));
		this.listeners();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = `<div class="content"></div>
		<div class="new-topic">
			<button class="new-topic-button">
				<i class="material-icons add">add</i>Add topic
			</button>
		</div>`;
	}

	private listeners() {
		const newTopicButton = this.querySelector('.new-topic-button') as HTMLButtonElement;
		newTopicButton.addEventListener('click', (e) => {
			$topicAddModal.open(
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
		const response = await fetch(
			`${url}/api/topic`,
			Options.POST({
				service_id: this.state.service_id,
				topic_title: topic_title,
				order_weight: nextOrderWeight,
			})
		);
		const json = await response.json();
		const newTopic = new Topic(json.result);
		contentTag.appendChild(newTopic);
		this.topics.push(newTopic);
	}

	private async getTopics() {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await fetch(`${url}/api/topic/${this.state.service_id}`, Options.GET());
			const json = await response.json();
			const sortedTopics = [...json.result];
			sortedTopics.sort((a: typeof Topic, b: typeof Topic) => a.order_weight - b.order_weight);
			await sortedTopics.forEach((topic) => this.topics.push(new Topic(topic)));
		} catch (err) {
			console.error('Error getting documents', err);
		}
	}
}

window.customElements.define('content-element', Content);

export default customElements.get('content-element');
