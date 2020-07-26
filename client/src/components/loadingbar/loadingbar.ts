class LoadingBar extends HTMLElement {
	constructor() {
		super();
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

	render() {
		this.innerHTML = `
    <div class="loading-container close-loading">
      <div class="loader"></div>
    </div>`;
	}

	public open() {
		this.classList.remove('close-loading');
	}

	public close() {
		const loading = this.querySelector('.loading-container') as HTMLElement;
		this.classList.add('close-loading');
	}
}

customElements.define('loading-modal', LoadingBar);
export default customElements.get('loading-modal');
