import HeaderElement from '../../components/header';
import SideBarElement from '../../components/sidebar';
import ContentElement from '../../components/content';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Header } from '../../components/header/header';
import { Content } from '../../components/content/content';
import Card from '../../components/card';
import { url, Options, POSITION, ORDER_WEIGHT, calcMedium, splitTitleContent } from '../../utils';
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
	private state: {} = {};
	private sidebar!: Sidebar;
	private header!: Header;
	private content!: Content;
	private dndCard: DndCard;

	constructor() {
		super();
		this.sidebar = new SideBarElement(1);
		this.header = new HeaderElement();
		this.content = new ContentElement({ service_id: 1 });
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
		await this.appendChild(this.content);
		this.appendListener();
		this.mouseEvent();
	}

	appendListener() {
		this.header.appendListener();
		this.sidebar.appendListener();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	mouseEvent() {
		document.addEventListener('mousedown', (event: MouseEvent) => this.mouseDown(event));
		document.addEventListener('mousemove', (event: MouseEvent) => this.mouseMove(event));
		document.addEventListener('mouseup', (event: MouseEvent) => this.mouseUp(event));
		document.addEventListener('mouseleave', (event: MouseEvent) => this.mouseLeave(event));
		this.initMovingCardWrapper();
	}

	initMovingCardWrapper() {
		this.dndCard.moving.classList.add('moving');
		this.appendChild(this.dndCard.moving);
	}

	mouseDown(event: MouseEvent) {
		this.dndCard.mouseDownX = event.pageX;
		this.dndCard.mouseDownY = event.pageY;
		this.dndCard.clicked = true;
		this.dndCard.position = POSITION.INIT;
	}

	mouseMove(event: MouseEvent) {
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
			if (!cte) return;
			this.dndCard.closeTopic = cte;
			const topicContent = this.dndCard.closeTopic.querySelector('.topic-content') as HTMLElement;
			const cce = document
				.elementFromPoint(event.pageX, event.pageY)
				?.closest('card-element') as typeof Card;
			this.dndCard.moving.hidden = false;
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

	async mouseUp(event: MouseEvent) {
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
		if (this.dndCard.cloned.getTopicId() !== this.dndCard.closeTopic.getTopicId()) {
			this.dndCard.closeTopic.incCount();
			const topicElements = document.querySelectorAll('topic-element');
			[...topicElements].forEach((e: typeof Topic) => {
				if (e.getTopicId() === this.dndCard.cloned.getTopicId()) {
					e.decCount();
					return;
				}
			});
		}

		const cardBody: CardDTO.UPDATE_POSITION = {
			card_id: this.dndCard.cloned.getCardId(),
			topic_id: this.dndCard.cloned.getTopicId(),
			order_weight: this.nextOrderWeight(this.dndCard.position),
		};
		CardApi.updatePosition(cardBody);

		const activityBody: ActivityDTO.MOVE = {
			action: Action.MOVE,
			card_id: this.dndCard.cloned.getCardId(),
			card_title: this.dndCard.cloned.getCardTitle(),
			service_id: store.getState('service_id'),
			uid: store.getState('uid'),
			user_id: store.getState('user_id'),
			to_topic: this.dndCard.closeTopic.getTopicTitle(),
			from_topic: this.content.getTopicTitleFromId(prevTopicId),
		};

		this.dndCard.closeTopic.pushCard(this.dndCard.cloned);
		await ActivityApi.create(activityBody);
		store.getState('newActivity')();
	}

	mouseLeave(event: MouseEvent) {
		this.mouseUp(event);
	}

	render() {
		this.innerHTML = ``;
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
