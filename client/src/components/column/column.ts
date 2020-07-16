import Card from '../card';
import { CardInterface } from '../card';
import ColumnInterface from './column_interface';

class Column extends HTMLElement {
	private state: ColumnInterface;
	private cards!: Array<HTMLElement>;

	constructor(data: ColumnInterface) {
		super();
		this.state = data;
		this.cards = [];
		this.getCards();
		this.state.count = this.cards.length;
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		const columnContent = this.querySelector('.column-content');
		const columnHeader = this.querySelector('.column-header');
		this.cards.map((card) => {
			columnContent?.appendChild(card);
		});
		columnHeader?.querySelector('.add')?.addEventListener('click', (e) => {
			e.stopPropagation();
			// input card 표시
		});
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	/**
	 * ToDo
	 * card 숫자 두자리, 세자리 처리 고민
	 */

	render() {
		this.innerHTML = `<div class="column">
      <div class="column-header">
        <div class="column-header-child">
          <div class="card-count">${this.state.count}</div>
          <h3>${this.state.title}</h3>
        </div>
        <div class="column-header-child">
          <i class="material-icons add">add</i>
          <i class="material-icons close">close</i>
        </div>
      </div>
      <div class="column-content"></div>
    </div>`;
	}

	private async getCards() {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			// const response = await fetch(`${url}/api/cards`, options);
			// const json = await response.json();

			const dump = [
				{
					card_id: 1,
					order_weight: 1,
					title: `Card title 01 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: '12312312',
					create_date: '123123123',
					column_id: this.state.column_id,
				},
				{
					card_id: 2,
					order_weight: 2,
					title: `Card title 02 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: '12312312',
					create_date: '123123123',
					column_id: this.state.column_id,
				},
				{
					card_id: 3,
					order_weight: 3,
					title: `Card title 03 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: '12312312',
					create_date: '123123123',
					column_id: this.state.column_id,
				},
				{
					card_id: 4,
					order_weight: 3,
					title: `Card title 04 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: '12312312',
					create_date: '123123123',
					column_id: this.state.column_id,
				},
				{
					card_id: 5,
					order_weight: 3,
					title: `Card title 05 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: '12312312',
					create_date: '123123123',
					column_id: this.state.column_id,
				},
				{
					card_id: 6,
					order_weight: 6,
					title: `Card title 06 of ${this.state.title}`,
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					user_name: 'loloara',
					last_update: '12312312',
					create_date: '123123123',
					column_id: this.state.column_id,
				},
			];
			await dump.forEach((card) => this.cards.push(new Card(card)));
		} catch (err) {
			console.log('Error getting documents', err);
		}
	}
}

window.customElements.define('column-element', Column);

export default customElements.get('column-element');
