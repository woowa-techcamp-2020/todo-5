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
            <textarea placeholder="Enter a card"></textarea>
            <div class="btn-group">
                <button class="card-add">Add</button>
                <button class="card-close">Cancel</button>
            </div>
        </div>`;
	}

	listener() {
		const inputBox = this.querySelector('textarea') as HTMLTextAreaElement;
		const btnGroup = this.querySelectorAll('button');
		inputBox.addEventListener('input', (e) => {
			if (inputBox.textLength > 200) {
				//글자 수 제한
				inputBox.value = inputBox.value.substring(0, 200);
			}

			if (inputBox.value === '') {
				//add 버튼 활성화
				btnGroup[0].classList.remove('enable-btn');
			} else {
				btnGroup[0].classList.add('enable-btn');
			}
		});
		btnGroup[0].addEventListener('click', (e) => {
			this.resolve({
				user_id: 1,
				user_name: 'loloara',
				content: inputBox?.value,
				topic_id: 1,
				card_title: 'title',
				order_weight: 1,
			});
			this.reject();
			inputBox.value = '';
		});
		btnGroup[1].addEventListener('click', (e) => {
			this.reject();
			inputBox.value = '';
		});
	}
	openCardInput() {
		const cardInput = this.querySelector('.card-input');
		cardInput?.classList.add('open');
	}
}

window.customElements.define('card-input-element', CardInput);

export default customElements.get('card-input-element');
