class LoadingBar extends HTMLElement {
	private state = {};

	constructor() {
		super();
	}

	open() {
		// const loading = this.querySelector('.loading-container') as HTMLElement;
		this.classList.remove('close-loading');
	}

	close() {
		console.log('close');
		const loading = this.querySelector('.loading-container') as HTMLElement;
		this.classList.add('close-loading');
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
}

customElements.define('loading-modal', LoadingBar);
const modal = customElements.get('loading-modal');
export { modal, LoadingBar };
