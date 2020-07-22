import HeaderElement from '../../components/header';
import SideBarElement from '../../components/sidebar';
import ContentElement from '../../components/content';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Header } from '../../components/header/header';
import { Content } from '../../components/content/content';

class TodoList extends HTMLElement {
	private state: {} = {};
	private sidebar!: Sidebar;
	private header!: Header;
	private content!: Content;

	constructor() {
		super();
		this.sidebar = new SideBarElement(1);
		this.header = new HeaderElement();
		this.content = new ContentElement({ service_id: 1 });
	}

	connectedCallback() {
		this.render();
		this.appendChild(this.sidebar);
		this.appendChild(this.header);
		this.appendChild(this.content);
		this.appendListener();
		this.mouseEvent();
	}

	appendListener() {
		this.header.appendListener();
		this.sidebar.appendListener();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	private card = {
		mouseDownX: 0,
		mouseDownY: 0,
		isDragging: false,
		clicked: false,
		selected: document.createElement('div') as HTMLElement,
		moving: document.createElement('div'),
		cloned: document.createElement('div'),
	};

	mouseEvent() {
		document.addEventListener('mousedown', (event: MouseEvent) => this.mouseDown(event));
		document.addEventListener('mousemove', (event: MouseEvent) => this.mouseMove(event));
		document.addEventListener('mouseup', (event: MouseEvent) => this.mouseUp(event));
		document.addEventListener('mouseleave', (event: MouseEvent) => this.mouseLeave(event));
		this.initMovingCardWrapper();
	}

	initMovingCardWrapper() {
		this.card.moving.classList.add('moving');
		this.appendChild(this.card.moving);
	}

	mouseDown(event: MouseEvent) {
		this.card.mouseDownX = event.pageX;
		this.card.mouseDownY = event.pageY;
		this.card.clicked = true;
	}

	mouseMove(event: MouseEvent) {
		if (!this.card.clicked) return;
		if (
			(this.card.mouseDownX - event.pageX !== 0 || this.card.mouseDownY - event.pageY !== 0) &&
			!this.card.isDragging
		) {
			const card = (event.target as HTMLElement).closest('card-element') as HTMLElement;
			if (!card) return;
			this.card.isDragging = true;
			// @TODO
			// @ts-ignore
			const moving = card.clone();
			// @ts-ignore
			this.card.cloned = card;
			this.card.cloned.classList.add('cloned');
			this.card.moving.appendChild(moving);
		}
		if (this.card.isDragging) {
			this.card.moving.style.left = event.pageX - this.card.moving.offsetWidth / 2 + 'px';
			this.card.moving.style.top = event.pageY - this.card.moving.offsetHeight / 2 + 'px';

			this.card.moving.hidden = true;
			const topic = document
				.elementFromPoint(event.pageX, event.pageY)
				?.closest('topic-element')
				?.querySelector('.topic-content') as HTMLElement;
			const card = document
				.elementFromPoint(event.pageX, event.pageY)
				?.closest('card-element') as HTMLElement;
			this.card.moving.hidden = false;

			if (!topic || card?.classList.contains('cloned')) return;
			if (!card) {
				if (!topic.querySelector('.cloned')) {
					const top = topic.getBoundingClientRect().top;
					if (event.pageY < top && topic.querySelector('card-element')) {
						topic.insertBefore(this.card.cloned, topic.childNodes[1]);
					} else {
						topic.appendChild(this.card.cloned);
					}
				}
			} else {
				const rect = card.getBoundingClientRect().top;
				const top = parseInt(this.card.moving.style.top.split('px')[0]);
				if (top > rect) {
					if ((card.nextSibling as HTMLElement).classList.contains('cloned')) return;
					card.parentNode?.insertBefore(this.card.cloned, card.nextSibling);
				} else {
					if (this.card.cloned.nextSibling === card) return;
					card.parentNode?.insertBefore(this.card.cloned, card);
				}
			}
		}
	}

	mouseUp(event: MouseEvent) {
		this.card.clicked = false;
		this.card.isDragging = false;
		if (this.card.moving.hasChildNodes()) {
			this.card.moving.removeChild(this.card.moving.firstChild as ChildNode);
		}
		//
		this.card.cloned.classList.remove('cloned');
		this.card.selected.remove();
		//
	}

	mouseLeave(event: MouseEvent) {
		this.card.clicked = false;
		this.card.isDragging = false;
		this.mouseUp(event);
	}

	render() {
		this.innerHTML = ``;
	}
}

window.customElements.define('todo-page', TodoList);

export default customElements.get('todo-page');
