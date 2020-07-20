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

	setChildElement(element: string) {
		this.childElement = element;
	}

	open(option: ModalInterface, callback: Function) {
		this.state = option;
		this.callback = callback;
		
		this.render();
		this.querySelector('.modal-area')?.classList.remove('modal-close');
		this.checkInputContent();
	}

	close() {
		this.querySelector('.modal-area')?.classList.add('modal-close');
	}

	listener() {
		const reject = this.querySelector('.reject-btn') as HTMLElement;
		const resolve = this.querySelector('.resolve-btn') as HTMLElement;
		const textarea = this.querySelector('.text-input') as HTMLTextAreaElement;

		textarea.value = this.state.content;

		reject.addEventListener('click', (e: MouseEvent) => this.checkReject(e));
		resolve.addEventListener('click', async (e: MouseEvent) => this.checkResolve(e, resolve));
		textarea.addEventListener('keyup', () => this.checkInputContent());
	}

	checkReject(e:MouseEvent) {
		e.stopPropagation();
		this.close();
	}

	async checkResolve(e: MouseEvent, resolve: HTMLElement) {
		e.stopPropagation();
		resolve.classList.add('disabled');
		await this.callback();
		resolve.classList.remove('disabled');
		this.close();
	}

	checkInputContent () {
		const resolve = this.querySelector('.resolve-btn') as HTMLElement;
		const textarea = this.querySelector('.text-input') as HTMLTextAreaElement;
		if (textarea.value.length === 0) {
			resolve.classList.add('disabled');
		} else if (resolve.classList.contains('disabled')) {
			resolve.classList.remove('disabled');
		}
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
			this.listener();
	}
}

customElements.define('modal-element', Modal);
const $modal = new (customElements.get('modal-element'))();

export default $modal;
export { ModalInterface, Modal };
