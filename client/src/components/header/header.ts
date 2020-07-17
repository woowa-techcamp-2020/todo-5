class Header extends HTMLElement {
	private state: { title: string };

	constructor() {
		super();
		this.state = { title: 'TODO 서비스' };
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
	}

	render() {
		this.innerHTML = `<header>
        <label class="service-title">${this.state.title}</label>
        <input id="toggle" type="checkbox">
        <label class="service-menu" for="toggle">
        <i class="material-icons">reorder</i></label>
    </header>`;
	}

	listener() {
		const toggle = this.querySelector('#toggle') as HTMLInputElement;
		const sidebar = document.querySelector('.slide-menu') as HTMLElement;
		toggle.addEventListener('change', (e: Event) => {
			if (toggle.checked === true) {
				sidebar.classList.add('open-slide');
			} else {
				sidebar.classList.remove('open-slide');
			}
		});
	}
}
window.customElements.define('header-element', Header);

export default customElements.get('header-element');
