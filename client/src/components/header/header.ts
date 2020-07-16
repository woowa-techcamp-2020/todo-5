class Header extends HTMLElement {
	private state: { title: string };

	constructor() {
		super();
		this.state = { title: 'TODO 서비스' };
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = `<header>
      <div class="service-title">${this.state.title}</div>
      <div class="service-menu">menu</div>
    </header>`;
	}
}

window.customElements.define('header-element', Header);

export default customElements.get('header-element');
