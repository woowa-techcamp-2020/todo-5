import Topic from '../topic';
const url = 'http://localhost:3000';

class Content extends HTMLElement {
	private state: {} = {};
	private topics!: Array<HTMLElement>;

	constructor() {
		super();
		this.topics = [];
		this.getTopics();
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		const contentTag = this.querySelector('.content') as HTMLElement;
		this.topics.map((topic: HTMLElement) => {
			contentTag.appendChild(topic);
		});
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
			// const response = await fetch(`${url}/api/topics`, options);
			// const json = await response.json();

			const dump = [
				{ topic_id: 1, order_weight: 1, title: 'todo' },
				{ topic_id: 2, order_weight: 2, title: 'doing' },
				{ topic_id: 3, order_weight: 3, title: 'done' },
			];
			await dump.forEach((topic) => {
				this.topics.push(new Topic(topic));
			});
		} catch (err) {
			console.log('Error getting documents', err);
		}
	}
}

window.customElements.define('content-element', Content);

export default customElements.get('content-element');
