class CardInput extends HTMLElement {
	private state: {};
	private resolve!: Function;
	private reject!: Function;

	constructor(resolve: Function, reject: Function) {
		super();
		this.state = {};
		this.resolve = resolve;
		this.reject = reject;
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
		this.innerHTML = `<div class="card-input">
            <input type="textarea">
            <div class="btn-group">
                <button>Add</button>
                <button>Cancel</button>
            </div>
        </div>`;
	}

	listener() {
		const inputBox = this.querySelector('input');
		const btnGroup = this.querySelectorAll('button');
		// inputBox?.addEventListener('change', (e) => {
		// 	console.log('change', inputBox.value);
		// 	inputBox.value === '' ? (inputBox.disabled = true) : (inputBox.disabled = false);
		// });
		btnGroup[0].addEventListener('click', (e) => {
			this.resolve();
			//card api call 추가
		});
		btnGroup[1].addEventListener('click', (e) => {
			//close
			this.reject();
		});
	}
	openCardInput() {
		const cardInput = this.querySelector('.card-input');
		cardInput?.classList.add('open');
	}
}

window.customElements.define('card-input-element', CardInput);

export default customElements.get('card-input-element');
