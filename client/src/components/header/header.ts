class Header extends HTMLElement {
	private state: { title: string };

	constructor() {
		super();
		this.state = { title: 'TODO 서비스' };
	}

	connectedCallback() {
		this.render();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	private render() {
		this.innerHTML = `<header>
        <label class="service-title">${this.state.title}</label>
        <input id="toggle" type="checkbox">
        <label class="service-menu" for="toggle">
        <i class="material-icons">reorder</i></label>
    </header>`;
	}

	/** 부모(page)가 listener를 등록합니ㅣ다.
	 * todo
	 * 구조 개선
	 */
	appendListener() {
		const toggle = this.querySelector('#toggle') as HTMLInputElement;
		const label = this.querySelector('.service-menu') as HTMLElement;
		const sidebar = document.querySelector('.slide-menu') as HTMLElement;
		const content = document.querySelector('content-element') as HTMLElement;

		toggle.addEventListener('change', (e: Event) => {
			if (toggle.checked === true) {
				sidebar.classList.add('open-slide');
				label.classList.add('open-slide');
				content.classList.add('open-slide');
			} else {
				sidebar.classList.remove('open-slide');
				label.classList.remove('open-slide');
				content.classList.remove('open-slide');
			}
		});
	}
}
window.customElements.define('header-element', Header);

export default customElements.get('header-element');
