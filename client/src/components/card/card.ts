import { $textAreaModal } from '../modal';
import { CardApi, ActivityApi } from '../../api';
import { ActivityDTO } from '../../../../shared/dto';
import store from '../../store';
import Topic from '../topic';
import { splitTitleContent } from '../../utils';

export interface CardInterface {
	card_id: number;
	order_weight: number;
	card_title: string;
	content: string;
	last_update: number;
	create_date: number;
	user_id: number;
	topic_id: number;
	topic_title: string;
	uid: string;
}

class Card extends HTMLElement {
	private state: CardInterface;

	constructor(data: CardInterface) {
		super();
		this.state = data;
	}

	connectedCallback() {
		this.render();
		this.listener();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
		this.listener();
	}

	private render() {
		this.innerHTML = `<div class="card">
		<div class="content-wrapper">
      <div class="card-title">
        <p>${this.state.card_title}</p>
        <i class="material-icons icon delete">close</i>
      </div>
			<div class="card-content">${this.state.content}</div>
			<div class="card-user">by <span>${this.state.uid}</span></div>
		</div>
    </div>`;
	}

	private listener() {
		const del = this.querySelector('.delete') as HTMLElement;
		const thisCard = this.querySelector('.card') as HTMLElement;

		del.addEventListener('click', this.deleteCardEvent.bind(this));
		thisCard.addEventListener('dblclick', (e) => this.openEditModal(e));
	}

	private async deleteCardEvent() {
		if (confirm('선택하신 카드를 삭제하시겠습니까?')) {
			try {
				const rst = await CardApi.delete(this.state.card_id);
				if (!this.state.topic_title) return;
				const body: ActivityDTO.REMOVE = {
					action: ActivityDTO.Action.REMOVE,
					card_id: this.state.card_id,
					service_id: store.getState('service_id'),
					user_id: store.getState('user_id'),
					from_topic: this.state.topic_title,
					card_title: this.state.card_title,
				};

				const topicElements = document.querySelectorAll('topic-element');
				[...topicElements].forEach((e: typeof Topic) => {
					if (e.getTopicId() === this.getTopicId()) {
						e.decCount();
						return;
					}
				});
				this.remove();

				await ActivityApi.delete(body);
				store.getState('newActivity')();
			} catch (err) {
				alert(`카드 삭제에 실패하였습니다: ${err}`);
			}
		}
	}

	private openEditModal(e: Event) {
		e.stopPropagation();
		$textAreaModal.open(
			{
				title: 'Edit',
				content: this.state.card_title + '\n' + this.state.content.replace(/<br\/>/g, '\n'),
				resolve: 'Save',
				reject: 'Cancel',
			},
			(c: string) => this.editContentOfCard(c)
		);
	}

	private async editContentOfCard(card_content: string) {
		card_content = card_content.replace(/\n/g, '<br/>');
		const body = {
			card_id: this.state.card_id,
			content: card_content,
		};

		try {
			await CardApi.update(body);
			const { title, content } = splitTitleContent(card_content);
			this.state.card_title = title;
			this.state.content = content;
			this.reload();

			const activity: ActivityDTO.UPDATE = {
				action: ActivityDTO.Action.UPDATE,
				card_id: this.state.card_id,
				service_id: store.getState('service_id'),
				user_id: store.getState('user_id'),
				card_title: this.state.card_title,
			};
			await ActivityApi.update(activity);
		} catch (err) {
			console.error(err);
		}
	}

	private reload() {
		this.render();
		this.listener();
		store.getState('newActivity')();
	}

	public clone(): HTMLElement {
		const c = new (customElements.get('card-element'))();
		c.state = this.state;
		return c;
	}

	public getCardId(): number {
		return this.state.card_id;
	}

	public getOrderWeight(): number {
		return this.state.order_weight;
	}

	public setTopicId(topic_id: number): void {
		this.state.topic_id = topic_id;
	}

	public getTopicId(): number {
		return this.state.topic_id;
	}

	public getCardTitle(): string {
		return this.state.card_title;
	}
}

window.customElements.define('card-element', Card);

export default customElements.get('card-element');
