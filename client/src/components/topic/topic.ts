import Card, { CardInterface } from '../card';
import CardInput from '../card-input';
import { CREATE } from '../../../../shared/dto/card-dto';
import Options from '../../utils';
const url = 'http://localhost:3000';
const ORDER_WEIGHT = 100000;
const TITLE_LIMIT = 20;

export interface TopicInterface {
	topic_id: number;
	order_weight: number;
	topic_title: string;
	count: number;
}

class Topic extends HTMLElement {
	private state: TopicInterface;
	private cardInput: typeof CardInput;
	private cards!: Array<typeof Card>;

	constructor(data: TopicInterface) {
		super();
		this.state = data;
		this.cardInput = new CardInput(this.addCardInput.bind(this), this.cancelCardInput.bind(this));
		this.cards = [];
		this.state.count = this.cards.length;
	}

	async connectedCallback() {
		await this.getCards();
		this.render();
		this.init();
		this.listeners();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	/**
	 * ToDo
	 * card 숫자 두자리, 세자리 처리 고민
	 */

	private init() {
		const topicContent = this.querySelector('.topic-content');
		topicContent?.appendChild(this.cardInput);
		this.cards.forEach((card) => topicContent?.appendChild(card));
	}

	listeners() {
		const addButton = this.querySelector('.add') as HTMLButtonElement;
		addButton?.addEventListener('click', (e) => {
			e.stopPropagation();
			this.cardInput.openCardInput();
			(e.target as HTMLButtonElement).classList.add('disabled');
		});
	}

	render() {
		this.innerHTML = `<div class="topic">
      <div class="topic-header">
        <div class="topic-header-child">
          <div class="card-count">${this.state.count}</div>
          <h3>${this.state.topic_title}</h3>
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
		try {
			const response = await fetch(`${url}/api/card/${this.state.topic_id}`, Options.GET());
			const json = await response.json();
			const sortedCards = [...json.result];
			if (sortedCards.length === 0) return;
			sortedCards.sort((a: typeof Card, b: typeof Card) => b.order_weight - a.order_weight);
			await sortedCards.forEach((card: CardInterface) => this.cards.push(new Card(card)));
			this.state.count = this.cards.length;
		} catch (err) {
			console.error('Error getting documents', err);
		}
	}

	private async addCardInput(card: CREATE) {
		const cardContents = this.splitTitleContent(card.content);
		card.card_title = cardContents.title;
		card.content = cardContents.content;
		card.topic_id = this.state.topic_id;
		card.order_weight = this.nextOrderWeight();

		try {
			const response = await fetch(`${url}/api/card`, Options.POST(card));
			const json = await response.json();
			this.cards.unshift(new Card(json.result));
			const topicContent = this.querySelector('.topic-content');
			topicContent?.insertBefore(this.cards[0], this.cards[1]);
			this.state.count++;
		} catch (err) {
			console.error('Error adding card', err);
		}
	}

	private cancelCardInput() {
		const addBtn = this.querySelector('.add');
		const cardInput = this.querySelector('.card-input');
		addBtn?.classList.remove('disabled');
		cardInput?.classList.remove('open');
	}

	private splitTitleContent(raw: string) {
		let title, content, tmp;
		tmp = raw.split('\n');
		if (tmp.length <= 1) {
			title = tmp[0];
			content = '';
		} else {
			title = tmp[0];
			tmp.shift();
			content = tmp.reduce((prev, now) => (prev += now), '');
		}

		return { title, content };
	}

	private nextOrderWeight() {
		return this.state.count ? this.cards[0].getOrderWeight() + ORDER_WEIGHT : ORDER_WEIGHT;
	}
}

window.customElements.define('topic-element', Topic);

export default customElements.get('topic-element');
