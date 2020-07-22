import Card, { CardInterface } from '../card';
import CardInput from '../card-input';
import { CREATE } from '../../../../shared/dto/card-dto';
import { Options, url, ORDER_WEIGHT } from '../../utils';
import { $inputTextModal } from '../modal';

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

	private init() {
		const topicContent = this.querySelector('.topic-content');
		topicContent?.appendChild(this.cardInput);
		this.cards.forEach((card) => topicContent?.appendChild(card));
	}

	private listeners() {
		const addButton = this.querySelector('.add') as HTMLElement;
		const closeButton = this.querySelector('.close') as HTMLElement;
		const topicTitle = this.querySelector('.topic-title') as HTMLElement;
		addButton.addEventListener('click', (e) => {
			e.stopPropagation();
			this.cardInput.openCardInput();
			addButton.classList.add('disabled');
		});
		closeButton.addEventListener('click', (e) => {
			e.stopPropagation();
			if (confirm('선택하신 토픽을 삭제하시겠습니까?')) {
				fetch(`${url}/api/topic/delete/${this.state.topic_id}`, Options.PATCH({}));
				this.remove();
			}
		});
		topicTitle.addEventListener('dblclick', (e) => {
			e.stopPropagation();
			$inputTextModal.open(
				{
					title: 'Edit',
					content: this.state.topic_title,
					resolve: 'Save',
					reject: 'Cancel',
				},
				(c: string) => this.editTopicTitle(c)
			);
		});
	}

	private async editTopicTitle(title: string) {
		const body = {
			topic_id: this.state.topic_id,
			topic_title: title,
		};
		const response = await fetch(`${url}/api/topic/update`, Options.PATCH(body));
		const json = await response.json();
		this.state.topic_title = title;
		this.render();
		this.init();
		this.listeners();
	}

	render() {
		this.innerHTML = `<div class="topic">
      <div class="topic-header">
        <div class="topic-header-child topic-title">
					<div class="topic-title">
					<div class="bar"></div>
					<span>${this.state.topic_title}</span>
					</div>
					<div class="card-count">${this.state.count}</div>
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
			await sortedCards.forEach((card: CardInterface) => {
				const { title, content } = this.splitTitleContent(card.content);
				card.card_title = title;
				card.content = content;
				this.cards.push(new Card(card));
			});
			this.state.count = this.cards.length;
		} catch (err) {
			console.error('Error getting documents', err);
		}
	}

	private async addCardInput(card: CREATE) {
		card.content = card.content.replace(/\n/g, '<br/>');
		console.log(card.content);
		const { title, content } = this.splitTitleContent(card.content);
		console.log('title: ', title, 'content: ', content);
		card.topic_id = this.state.topic_id;
		card.order_weight = this.nextOrderWeight();

		try {
			const response = await fetch(`${url}/api/card`, Options.POST(card));
			const json = await response.json();
			json.result.content = content;
			json.result.card_title = title;
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
		tmp = raw.split('<br/>');
		if (tmp.length <= 1) {
			title = tmp[0];
			content = '';
		} else {
			title = tmp[0];
			tmp.shift();
			content = tmp.reduce((prev, now) => (prev += now + '<br/>'), '');
			content = content.substring(0, content.length - 5);
		}

		return { title, content };
	}

	private nextOrderWeight() {
		return this.state.count ? this.cards[0].getOrderWeight() + ORDER_WEIGHT : ORDER_WEIGHT;
	}

	public getOrderWeight() {
		return this.state.order_weight;
	}
}

window.customElements.define('topic-element', Topic);

export default customElements.get('topic-element');
