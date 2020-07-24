import Card, { CardInterface } from '../card';
import CardInput from '../card-input';
import { CardDTO, ActivityDTO } from '../../../../shared/dto';
import { ORDER_WEIGHT, splitTitleContent } from '../../utils';
import { CardApi, TopicApi, ActivityApi } from '../../api';
import { $inputTextModal } from '../modal';
import store from '../../store';

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
		this.state.count = this.cards.length;
		this.render();
	}

	private init() {
		const topicTag = this.querySelector('.topic-wrapper') as HTMLElement;
		const topicContent = topicTag.querySelector('.topic-content') as HTMLElement;
		topicTag.insertBefore(this.cardInput, topicContent);
		this.cards.forEach((card) => topicContent.appendChild(card));
	}

	private listeners() {
		const addButton = this.querySelector('.add') as HTMLElement;
		const closeButton = this.querySelector('.close') as HTMLElement;
		const topicTitle = this.querySelector('.topic-title') as HTMLElement;
		addButton.addEventListener('click', (e) => {
			e.stopPropagation();
			this.cardInput.changeCardInput();
			if (addButton.classList.contains('changed')) {
				addButton.classList.remove('changed');
			} else {
				addButton.classList.add('changed');
			}
		});
		closeButton.addEventListener('click', async (e) => {
			if (confirm('선택하신 토픽을 삭제하시겠습니까?')) {
				try {
					await TopicApi.delete(this.state.topic_id);
					await CardApi.deleteAll(this.state.topic_id);
					const activity: ActivityDTO.TOPICREMOVE = {
						action: ActivityDTO.Action.TOPICREMOVE,
						service_id: store.getState('service_id'),
						user_id: store.getState('user_id'),
						from_topic: this.state.topic_title,
					};
					const activityResult = await ActivityApi.topicDelete(activity);
					store.getState('newActivity')();
					this.remove();
				} catch (err) {
					throw err;
				}
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
			user_id: store.getState('user_id'),
		};
		try {
			const result = await TopicApi.update(body);
			this.state.topic_title = title;
			const activity: ActivityDTO.TOPICUPDATE = {
				action: ActivityDTO.Action.TOPICUPDATE,
				service_id: store.getState('service_id'),
				user_id: store.getState('user_id'),
				to_topic: this.state.topic_title,
			};
			const activityResult = await ActivityApi.topicUpdate(activity);
			store.getState('newActivity')();
			this.render();
			this.init();
			this.listeners();
		} catch (err) {}
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
		<div class="topic-wrapper">
			<div class="topic-content">
		</div>
	  </div>
	</div>`;
	}

	private async getCards() {
		const response = await CardApi.getAll(this.state.topic_id);
		const sortedCards = [...response.result];
		if (sortedCards.length === 0) return;
		sortedCards.sort((a: typeof Card, b: typeof Card) => b.order_weight - a.order_weight);
		await sortedCards.forEach((card: CardInterface) => {
			const { title, content } = splitTitleContent(card.content);
			card.card_title = title;
			card.content = content;
			card.topic_title = this.state.topic_title;
			this.cards.push(new Card(card));
		});
		this.state.count = this.cards.length;
	}

	private async addCardInput(card: CardDTO.CREATE) {
		card.content = card.content.replace(/\n/g, '<br/>');
		const { title, content } = splitTitleContent(card.content);
		card.topic_id = this.state.topic_id;
		card.order_weight = this.nextOrderWeight();
		try {
			const result = await CardApi.create(card);
			result.result.content = content;
			result.result.card_title = title;
			result.result.topic_title = this.state.topic_title;
			result.result.uid = store.getState('uid');
			this.cards.unshift(new Card(result.result));
			const topicContent = this.querySelector('.topic-content');
			if (this.state.count === 0) {
				topicContent?.appendChild(this.cards[0]);
			} else {
				topicContent?.insertBefore(this.cards[0], this.cards[1]);
			}
			this.state.count++;
			this.drawCount();

			const body: ActivityDTO.ADD = {
				action: ActivityDTO.Action.ADD,
				card_id: result.result.card_id,
				service_id: store.getState('service_id'),
				user_id: store.getState('user_id'),
				to_topic: this.state.topic_title,
				card_title: title,
			};
			const activityResult = await ActivityApi.add(body);
			store.getState('newActivity')();
		} catch (err) {
			alert('카드 생성에 실패하였습니다.');
			console.error(err);
		}
	}

	private cancelCardInput() {
		const addBtn = this.querySelector('.add') as HTMLElement;
		const cardInput = this.querySelector('.card-input') as HTMLElement;
		addBtn.classList.remove('changed');
		cardInput.classList.remove('open');
	}

	public nextOrderWeight(): number {
		return this.state.count ? this.cards[0].getOrderWeight() + ORDER_WEIGHT : ORDER_WEIGHT;
	}

	public getOrderWeight(): number {
		return this.state.order_weight;
	}

	public getTopicId(): number {
		return this.state.topic_id;
	}

	public getTopicTitle(): string {
		return this.state.topic_title;
	}

	public incCount(): void {
		this.state.count++;
		this.drawCount();
	}

	public decCount(): void {
		this.state.count--;
		this.drawCount();
	}

	private drawCount(): void {
		(this.querySelector('.card-count') as HTMLElement).innerHTML = `${this.state.count}`;
	}

	public pushCard(card: typeof Card): void {
		this.cards.push(card);
	}
}

window.customElements.define('topic-element', Topic);

export default customElements.get('topic-element');
