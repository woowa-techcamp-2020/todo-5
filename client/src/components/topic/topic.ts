import Card from '../card';
import CardInput from '../card_input';
import { CardInterface } from '../card';
import TopicInterface from './topic_interface';

class Topic extends HTMLElement {
	private state: TopicInterface;
	private cardInput: typeof CardInput;
	private cards!: Array<HTMLElement>;

	constructor(data: TopicInterface) {
		super();
		this.state = data;
		this.cardInput = new CardInput(this.addCardInput, this.cancelCardInput.bind(this));
		this.cards = [];
		this.getCards();
		this.state.count = this.cards.length;
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		const topicContent = this.querySelector('.topic-content');
		const inputArea = topicContent?.querySelector('.input-area');
		const addButton = this.querySelector('.add');
		topicContent?.appendChild(this.cardInput);
		this.cards.map((card) => {
			topicContent?.appendChild(card);
		});
		addButton?.addEventListener('click', (e) => {
			e.stopPropagation();
			//inputArea?.appendChild(new CardInput());
			this.cardInput.openCardInput();
			addButton.classList.add('disabled');
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
		this.innerHTML = `<div class="topic">
      <div class="topic-header">
        <div class="topic-header-child">
          <div class="card-count">${this.state.count}</div>
          <h3>${this.state.title}</h3>
        </div>
        <div class="topic-header-child">
          <i class="material-icons add">add</i>
          <i class="material-icons close">close</i>
        </div>
	  </div>	  
	  <div class="topic-content">
	  <div class="input-area"></div>
	  </div>
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
					last_update: 12312312,
					create_date: 123123123,
					topic_id: this.state.topic_id,
					user_id: 1,
				},
				{
					card_id: 2,
					order_weight: 2,
					title: `Card title 02 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: 12312312,
					create_date: 123123123,
					topic_id: this.state.topic_id,
					user_id: 1,
				},
				{
					card_id: 3,
					order_weight: 3,
					title: `Card title 03 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: 12312312,
					create_date: 123123123,
					topic_id: this.state.topic_id,
					user_id: 1,
				},
				{
					card_id: 4,
					order_weight: 3,
					title: `Card title 04 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: 12312312,
					create_date: 123123123,
					topic_id: this.state.topic_id,
					user_id: 1,
				},
				{
					card_id: 5,
					order_weight: 3,
					title: `Card title 05 of ${this.state.title}`,
					user_name: 'loloara',
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					last_update: 12312312,
					create_date: 123123123,
					topic_id: this.state.topic_id,
					user_id: 1,
				},
				{
					card_id: 6,
					order_weight: 6,
					title: `Card title 06 of ${this.state.title}`,
					content: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
					user_name: 'loloara',
					last_update: 12312312,
					create_date: 123123123,
					topic_id: this.state.topic_id,
					user_id: 1,
				},
			];
			await dump.forEach((card: CardInterface) => this.cards.push(new Card(card)));
		} catch (err) {
			console.log('Error getting documents', err);
		}
	}

	addCardInput() {}

	cancelCardInput() {
		const addBtn = this.querySelector('.add');
		console.log('this', this);
		const cardInput = this.querySelector('.card-input');
		console.log('addbtn', addBtn);
		addBtn?.classList.remove('disabled');
		cardInput?.classList.remove('open');
	}
}

window.customElements.define('topic-element', Topic);

export default customElements.get('topic-element');
