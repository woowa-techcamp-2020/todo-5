import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Content from '../../components/content';

class TodoList extends HTMLElement {
	private state: {} = {};
	private sidebar!: HTMLElement;
	private header!: HTMLElement;
	private content!: HTMLElement;

	constructor() {
		super();
		this.sidebar = new Sidebar(1);
		this.header = new Header();
		this.content = new Content();
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		console.log('render');
		this.appendChild(this.sidebar);
		this.appendChild(this.header);
		this.appendChild(this.content);
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = ``;
	}
}

window.customElements.define('todo-page', TodoList);

export default customElements.get('todo-page');
