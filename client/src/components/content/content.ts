import Topic from '../topic';
import { Options, url } from '../../utils';

export interface ContentInterface {
	service_id: string;
}

class Content extends HTMLElement {
	private state: ContentInterface;
	private topics!: Array<HTMLElement>;

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
		this.topics.forEach((topic: HTMLElement) => contentTag.appendChild(topic));
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = `<div class="content"></div>`;
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
			console.log(sortedTopics);
			await sortedTopics.forEach((topic) => this.topics.push(new Topic(topic)));
		} catch (err) {
			console.error('Error getting documents', err);
		}
	}
}

window.customElements.define('content-element', Content);

export default customElements.get('content-element');
