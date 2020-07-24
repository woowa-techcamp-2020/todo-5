import store from '../../store';

class CardInput extends HTMLElement {
	private resolve!: Function;
	private reject!: Function;

	constructor(resolve: Function, reject: Function) {
		super();
		this.resolve = resolve;
		this.reject = reject;
	}

	connectedCallback() {
		this.render();
		this.listener();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
		this.listener();
	}

	private render() {
		this.innerHTML = `<div class="card-input">
            <textarea placeholder="Enter a card"></textarea>
            <div class="btn-group">
                <div class="button card-add">Add</div>
                <div class="button card-close">Cancel</div>
            </div>
        </div>`;
	}

	private listener() {
		const inputBox = this.querySelector('textarea') as HTMLTextAreaElement;
		const addBtn = this.querySelector('.card-add') as HTMLButtonElement;
		const closeBtn = this.querySelector('.card-close') as HTMLButtonElement;

		inputBox.addEventListener('input', (e: Event) => this.enableAddButton(e, addBtn));
		addBtn.addEventListener('click', (e: Event) => this.addCardEvent(e, inputBox));
		closeBtn.addEventListener('click', () => this.closeCardEvent(inputBox, addBtn));
	}

	private enableAddButton(e: Event, addButton: HTMLButtonElement) {
		if ((e.target as HTMLTextAreaElement).value === '') {
			addButton.classList.remove('enable-btn');
		} else {
			addButton.classList.add('enable-btn');
		}
	}

	private addCardEvent(e: Event, inputBox: HTMLTextAreaElement) {
		this.resolve({
			user_id: store.getState('user_id'),
			content: inputBox?.value,
			topic_id: 1,
			order_weight: 1,
		});
		this.reject();
		this.resetInput(inputBox, e.target as HTMLButtonElement);
		if (inputBox.textLength > 200) {
			inputBox.value = inputBox.value.substring(0, 200);
		}
	}

	private closeCardEvent(inputBox: HTMLTextAreaElement, addBtn: HTMLButtonElement) {
		this.reject();
		this.resetInput(inputBox, addBtn);
	}

	private resetInput(inputBox: HTMLTextAreaElement, addBtn: HTMLButtonElement) {
		inputBox.value = '';
		if (addBtn.classList.contains('enable-btn')) {
			addBtn.classList.remove('enable-btn');
		}
	}

	public openCardInput() {
		const cardInput = this.querySelector('.card-input');
		cardInput?.classList.add('open');
	}
}

window.customElements.define('card-input-element', CardInput);

export default customElements.get('card-input-element');
