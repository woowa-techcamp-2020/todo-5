import Header from '../../components/header';
import SideBar from '../../components/sidebar';
import Content from '../../components/content';
import Card from '../../components/card';
import { POSITION, ORDER_WEIGHT, calcMedium } from '../../utils';
import { CardDTO, ActivityDTO } from '../../../../shared/dto';
import Topic from '../../components/topic';
import { ActivityApi, CardApi } from '../../api';
import { Action } from '../../../../shared/dto/activity-dto';
import store from '../../store';

interface DndCard {
	mouseDownX: number;
	mouseDownY: number;
	isDragging: boolean;
	clicked: boolean;
	moving: typeof Card;
	cloned: typeof Card;
	closeTopic: typeof Topic;
	closeCard: typeof Card;
	position: number; //가까운 카드의 위쪽이면 -1, 아래쪽이면 1
}
class TodoList extends HTMLElement {
	private sidebar: typeof SideBar;
	private header: typeof Header;
	private content: typeof Content;
	private dndCard: DndCard;

	constructor() {
		super();
		this.sidebar = new SideBar(store.getState('service_id'));
		this.header = new Header();
		this.content = new Content(store.getState('service_id'));
		this.dndCard = {
			mouseDownX: 0,
			mouseDownY: 0,
			isDragging: false,
			clicked: false,
			moving: document.createElement('div'),
			cloned: document.createElement('div'),
			closeCard: document.createElement('div'),
			closeTopic: document.createElement('div'),
			position: POSITION.INIT,
		};
	}

	async connectedCallback() {
		this.render();
		this.appendChild(this.sidebar);
		this.appendChild(this.header);
		this.appendChild(this.content);
		this.appendListener();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = ``;
	}

	private appendListener() {
		this.header.appendListener();
		this.sidebar.appendListener();
		this.mouseEvent();
	}

	private mouseEvent() {
		document.addEventListener('mousedown', (event: MouseEvent) => this.mouseDown(event));
		document.addEventListener('mousemove', (event: MouseEvent) => this.mouseMove(event));
		document.addEventListener('mouseup', (event: MouseEvent) => this.mouseUp(event));
		document.addEventListener('mouseleave', (event: MouseEvent) => this.mouseLeave(event));
		this.initMovingCardWrapper();
	}

	private initMovingCardWrapper() {
		this.dndCard.moving.classList.add('moving');
		this.appendChild(this.dndCard.moving);
	}

	private mouseDown(event: MouseEvent) {
		this.dndCard.mouseDownX = event.pageX;
		this.dndCard.mouseDownY = event.pageY;
		this.dndCard.clicked = true;
		this.dndCard.position = POSITION.INIT;
	}

	private mouseMove(event: MouseEvent) {
		event.preventDefault();

		if (!this.dndCard.clicked) return;
		if (
			(this.dndCard.mouseDownX - event.pageX !== 0 ||
				this.dndCard.mouseDownY - event.pageY !== 0) &&
			!this.dndCard.isDragging
		) {
			const targetCard = (event.target as HTMLElement).closest('card-element') as typeof Card;
			if (!targetCard) return;
			this.dndCard.isDragging = true;
			const moving = targetCard.clone();
			this.dndCard.cloned = targetCard;
			this.dndCard.cloned.classList.add('cloned');
			this.dndCard.moving.appendChild(moving);
		}
		if (this.dndCard.isDragging) {
			this.dndCard.moving.style.left = event.pageX - this.dndCard.moving.offsetWidth / 2 + 'px';
			this.dndCard.moving.style.top = event.pageY - this.dndCard.moving.offsetHeight / 2 + 'px';

			this.dndCard.moving.hidden = true;
			const cte = document
				.elementFromPoint(event.pageX, event.pageY)
				?.closest('topic-element') as typeof Topic;
			const cce = document
				.elementFromPoint(event.pageX, event.pageY)
				?.closest('card-element') as typeof Card;
			this.dndCard.moving.hidden = false;

			if (cte) this.dndCard.closeTopic = cte;
			const topicContent = this.dndCard.closeTopic.querySelector('.topic-content') as HTMLElement;
			this.dndCard.closeCard = cce;

			if (!this.dndCard.closeTopic || this.dndCard.closeCard?.classList.contains('cloned')) return;
			if (!this.dndCard.closeCard) {
				if (!topicContent.querySelector('.cloned')) {
					const top = topicContent.getBoundingClientRect().top;
					if (event.pageY < top && topicContent.querySelector('card-element')) {
						topicContent.insertBefore(this.dndCard.cloned, topicContent.childNodes[1]);
						this.dndCard.position = POSITION.TOP;
					} else {
						topicContent.appendChild(this.dndCard.cloned);
						this.dndCard.position = POSITION.BOTTOM;
					}
				}
			} else {
				const rect = this.dndCard.closeCard.getBoundingClientRect().top;
				const top = parseInt(this.dndCard.moving.style.top.split('px')[0]);
				if (top > rect) {
					if (!this.dndCard.closeCard.nextSibling) {
						topicContent.appendChild(this.dndCard.cloned);
						this.dndCard.position = POSITION.BOTTOM;
					} else if (
						(this.dndCard.closeCard.nextSibling as HTMLElement).classList.contains('cloned')
					) {
						return;
					} else {
						if ((this.dndCard.closeCard.nextSibling as HTMLElement).classList.contains('cloned')) {
							this.dndCard.closeCard = this.dndCard.closeCard.nextSibling;
						}
						topicContent.insertBefore(this.dndCard.cloned, this.dndCard.closeCard);
						this.dndCard.position = POSITION.DOWN;
					}
				} else {
					if (this.dndCard.cloned.nextSibling === this.dndCard.closeCard) {
						return;
					} else {
						topicContent.insertBefore(this.dndCard.cloned, this.dndCard.closeCard);
						this.dndCard.position = POSITION.UP;
						if (!this.dndCard.cloned.previousElementSibling) this.dndCard.position = POSITION.TOP;
					}
				}
			}
		}
	}

	private async mouseUp(event: MouseEvent) {
		if (!this.dndCard.clicked) return;
		this.dndCard.clicked = false;
		this.dndCard.isDragging = false;
		if (this.dndCard.moving.hasChildNodes()) {
			this.dndCard.moving.removeChild(this.dndCard.moving.firstChild as ChildNode);
		}
		this.dndCard.cloned.classList.remove('cloned');
		if (!this.dndCard.cloned.parentNode) return;

		if (this.dndCard.position === POSITION.INIT) return;
		const prevTopicId = this.dndCard.cloned.getTopicId();
		this.dndCard.cloned.setTopicId(this.dndCard.closeTopic.getTopicId());
		if (prevTopicId !== this.dndCard.closeTopic.getTopicId()) {
			this.dndCard.closeTopic.incCount();
			const topicElements = document.querySelectorAll('topic-element');
			[...topicElements].forEach((e: typeof Topic) => {
				if (e.getTopicId() === prevTopicId) {
					e.decCount();
					return;
				}
			});
		}

		this.dndCard.closeTopic.pushCard(this.dndCard.cloned);

		const cardBody: CardDTO.UPDATE_POSITION = {
			card_id: this.dndCard.cloned.getCardId(),
			topic_id: this.dndCard.cloned.getTopicId(),
			order_weight: this.nextOrderWeight(this.dndCard.position),
		};
		CardApi.updatePosition(cardBody);

		const activityBody: ActivityDTO.MOVE = {
			action: Action.MOVE,
			card_id: this.dndCard.cloned.getCardId(),
			service_id: store.getState('service_id'),
			user_id: store.getState('user_id'),
			to_topic: this.dndCard.closeTopic.getTopicTitle(),
			from_topic: this.content.getTopicTitleFromId(prevTopicId),
			card_title: this.dndCard.cloned.getCardTitle(),
			uid: store.getState('uid'),
		};
    
		const activity = await ActivityApi.create(activityBody);
		store.getState('newActivity')(activity.result);
	}

	private mouseLeave(event: MouseEvent) {
		this.mouseUp(event);
	}

	private nextOrderWeight(position: number): number {
		const topicContent = this.dndCard.closeTopic?.querySelector('.topic-content') as HTMLElement;
		const cloned: typeof Card = this.dndCard.cloned;

		switch (position) {
			case POSITION.TOP:
				return this.dndCard.closeTopic.nextOrderWeight();
			case POSITION.BOTTOM:
				const lastChild: typeof Card = topicContent.lastChild;
				if (!lastChild.previousElementSibling) return ORDER_WEIGHT;
				return lastChild
					? calcMedium(lastChild.previousElementSibling.getOrderWeight(), 0)
					: ORDER_WEIGHT;
			case POSITION.UP:
			case POSITION.DOWN:
				if (!cloned.previousElementSibling) return this.dndCard.closeTopic.nextOrderWeight();
				return calcMedium(
					cloned.nextSibling.getOrderWeight(),
					cloned.previousElementSibling.getOrderWeight()
				);
			default:
				console.error('anomaly POSITION value: ', position);
				return 0;
		}
	}
}

window.customElements.define('todo-page', TodoList);

export default customElements.get('todo-page');
