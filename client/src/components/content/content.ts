import { Coloumn } from '../column';
const url = 'http://localhost:3000';

class Content extends HTMLElement {
	private state: {} = {};
	private columns!: Array<HTMLElement>;

	constructor() {
		super();
		this.columns = [];
		this.getColumns();
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		const contentTag = this.querySelector('.content') as HTMLElement;
		this.columns.map((column: HTMLElement) => {
			contentTag.appendChild(column);
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

	private async getColumns() {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			// const response = await fetch(`${url}/api/columns`, options);
			// const json = await response.json();

			const dump = [
				{ column_id: 1, order_weight: 1, title: 'todo' },
				{ column_id: 2, order_weight: 2, title: 'doing' },
				{ column_id: 3, order_weight: 3, title: 'done' },
			];
			await dump.forEach((col) => {
				this.columns.push(new Coloumn(col));
			});
		} catch (err) {
			console.log('Error getting documents', err);
		}
	}
}

window.customElements.define('content-element', Content);

export default customElements.get('content-element');
