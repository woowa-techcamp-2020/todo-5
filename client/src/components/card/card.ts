import { $textAreaModal } from '../modal';
import { CardApi, ActivityApi } from '../../api';
import { ActivityDTO } from '../../../../shared/dto';
import store from '../../store';

export interface CardInterface {
	card_id: number;
	order_weight: number;
	card_title: string;
	uid: string;
	content: string;
	last_update: number;
	create_date: number;
	user_id: number;
	topic_id: number;
	topic_title?: string;
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
					const result = await CardApi.delete(this.state.card_id);
					if (!this.state.topic_title) return;
					const body: ActivityDTO.REMOVE = {
						action: ActivityDTO.Action.REMOVE,
						card_id: this.state.card_id,
						card_title: this.state.card_title,
						service_id: store.getState('service_id'),
						uid: store.getState('uid'),
						user_id: store.getState('user_id'),
						from_topic: this.state.topic_title,
					};
					const activityResult = await ActivityApi.delete(body);
					this.remove();
					store.getState('newActivity')();
				} catch (err) {
					alert('카드 삭제에 실패하였습니다');
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
				card_title: this.state.card_title,
				service_id: store.getState('service_id'),
				uid: store.getState('uid'),
				user_id: store.getState('user_id'),
			};
			const activityResult = await ActivityApi.update(activity);
			const { title, content } = this.splitTitleContent(card_content);
			this.state.card_title = title;
			this.state.content = content;
			this.render();
			this.listener();
			store.getState('newActivity')();
		} catch (err) {}
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

	render() {
		this.innerHTML = `<div class="card">
		<div class="content-wrapper">
      <div class="card-title">
        <p>${this.state.card_title}</p>
        <i class="material-icons icon delete">close</i>
      </div>
			<div class="card-content">${this.state.content}</div>
			<div class="card-user">by <span>${this.state.order_weight}</span></div>
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
}

window.customElements.define('card-element', Card);

export default customElements.get('card-element');
