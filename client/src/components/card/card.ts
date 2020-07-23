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
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		this.listener();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
		this.listener();
	}

	clone(): HTMLElement {
		const c = new (customElements.get('card-element'))();
		c.state = this.state;
		return c;
	}

	listener() {
		const del = this.querySelector('.delete') as HTMLElement;
		del.addEventListener('click', async (e) => {
			e.stopPropagation();
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
					await ActivityApi.delete(body);
					store.getState('newActivity')();

					const topicElements = document.querySelectorAll('topic-element');
					[...topicElements].forEach((e: typeof Topic) => {
						if (e.getTopicId() === this.getTopicId()) {
							e.decCount();
						}
					});

					this.remove();
				} catch (err) {
					alert(`카드 삭제에 실패하였습니다: ${err}`);
				}
			}
		});
		this.querySelector('.card')?.addEventListener('dblclick', (e) => {
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
		});
	}

	private async editContentOfCard(card_content: string) {
		card_content = card_content.replace(/\n/g, '<br/>');
		const body = {
			card_id: this.state.card_id,
			content: card_content,
		};

		try {
			const result = await CardApi.update(body);
			const activity: ActivityDTO.UPDATE = {
				action: ActivityDTO.Action.UPDATE,
				card_id: this.state.card_id,
				service_id: store.getState('service_id'),
				user_id: store.getState('user_id'),
				card_title: this.state.card_title,
			};
			const activityResult = await ActivityApi.update(activity);
			const { title, content } = splitTitleContent(card_content);
			this.state.card_title = title;
			this.state.content = content;
			this.render();
			this.listener();
			store.getState('newActivity')();
		} catch (err) {}
	}

	render() {
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

	getCardId(): number {
		return this.state.card_id;
	}

	getOrderWeight(): number {
		return this.state.order_weight;
	}

	setTopicId(topic_id: number): void {
		this.state.topic_id = topic_id;
	}

	getTopicId(): number {
		return this.state.topic_id;
	}

	getCardTitle(): string {
		return this.state.card_title;
	}
}

window.customElements.define('card-element', Card);

export default customElements.get('card-element');
