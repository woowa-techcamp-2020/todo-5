import Card from '../card';

interface ColumnInterface {
	column_id: number;
	order_weight: number;
	title: string;
}

class Column extends HTMLElement {
	private state: {} = {};
	private column_id!: number;
	private order_weight!: number;
	private column_title!: string;
	private cards!: Array<HTMLElement>;

	constructor(data: ColumnInterface) {
		super();
		this.column_id = data.column_id;
		this.order_weight = data.order_weight;
		this.column_title = data.title;
		this.cards = [];
		this.getCards();
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		const columnTag = this.querySelector('.column-content') as HTMLElement;
		this.cards.map((card) => {
			columnTag.appendChild(card);
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
		this.innerHTML = `<div class="column">
      <div class="column-header">
        <div class="column-header-child">
          <div class="card-count">3</div>
          <h3>Title</h3>
        </div>
        <div class="column-header-child">
          <i class="material-icons">add</i>
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
					title: '01010101',
					content: 'contentcontent',
					last_update: '12312312',
					create_date: '123123123',
				},
				{
					card_id: 2,
					order_weight: 2,
					title: '2222222',
					content: 'contentcontent',
					last_update: '12312312',
					create_date: '123123123',
				},
				{
					card_id: 3,
					order_weight: 3,
					title: '333333',
					content: 'contentcontent',
					last_update: '12312312',
					create_date: '123123123',
				},
				{
					card_id: 4,
					order_weight: 3,
					title: '333333',
					content: 'contentcontent',
					last_update: '12312312',
					create_date: '123123123',
				},
				{
					card_id: 5,
					order_weight: 3,
					title: '333333',
					content: 'contentcontent',
					last_update: '12312312',
					create_date: '123123123',
				},
				{
					card_id: 6,
					order_weight: 6,
					title: '333333',
					content: 'contentcontent',
					last_update: '12312312',
					create_date: '123123123',
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
