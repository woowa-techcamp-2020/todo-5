interface ModalInterface {
	title: string;
	content: string;
	resolve?: string;
	reject?: string;
}

class Modal extends HTMLElement {
	private state: ModalInterface = {
		title: '',
		content: '',
		resolve: '확인',
		reject: '취소',
	};
	private childElement: string = '<div class="text-input"></div>';
	private callback: Function = () => {};

	constructor() {
		super();
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
		this.innerHTML = `
    <div class="modal-area modal-close" id="modal">
      <div class="modal-container">
        <div class="title text-ellipsis">${this.state.title}</div>
				<div class="content">
					${this.childElement}
				</div>
        <div class="button-zone">
          <div class="button reject-btn">${this.state.reject}</div>
          <div class="button resolve-btn">${this.state.resolve}</div>
        </div>
      </div>
    </div>
    `;
	}

	private listener() {
		const reject = this.querySelector('.reject-btn') as HTMLElement;
		const resolve = this.querySelector('.resolve-btn') as HTMLElement;
		const textarea = this.querySelector('.text-input') as HTMLTextAreaElement;

		textarea.value = this.state.content;

		reject.addEventListener('click', (e: MouseEvent) => this.checkReject(e));
		resolve.addEventListener('click', async (e: MouseEvent) => this.checkResolve(e, resolve));

		/**
		 * todo
		 * childElement undefined 이슈 해결해야 합니다.
		 */
		//textarea.addEventListener('keyup', this.checkInputContent);
	}

	private close() {
		this.querySelector('.modal-area')?.classList.add('modal-close');
	}

	private checkReject(e: MouseEvent) {
		e.stopPropagation();
		this.close();
	}

	private async checkResolve(e: MouseEvent, resolve: HTMLElement) {
		e.stopPropagation();
		const textValue = this.querySelector('.text-input') as HTMLTextAreaElement;
		resolve.classList.add('disabled');
		await this.callback(textValue.value);
		resolve.classList.remove('disabled');
		this.close();
	}

	private checkInputContent() {
		const resolve = this.querySelector('.resolve-btn') as HTMLElement;
		const textarea = this.querySelector('.text-input') as HTMLTextAreaElement | HTMLInputElement;
		if (textarea.value.length === 0) {
			resolve.classList.add('disabled');
		} else if (resolve.classList.contains('disabled')) {
			resolve.classList.remove('disabled');
		}
	}

	public setChildElement(element: string) {
		this.childElement = element;
		this.render();
		this.listener();
	}

	public open(option: ModalInterface, callback: Function) {
		this.state = option;
		this.callback = callback;

		this.render();
		this.listener();
		this.querySelector('.modal-area')?.classList.remove('modal-close');
		this.checkInputContent();
	}
}

customElements.define('modal-element', Modal);
const $modal = new (customElements.get('modal-element'))();

export default $modal;
export { ModalInterface, Modal };
