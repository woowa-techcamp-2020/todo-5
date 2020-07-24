import $modal, { ModalInterface, Modal } from './base-modal/modal';

class TextAreaModal {
	private $modal!: Modal;
	private option!: ModalInterface;
	private callback!: Function;

	constructor() {
		this.$modal = $modal;
	}

	public open(option: ModalInterface, callback: Function) {
		this.option = option;
		this.callback = callback;
		this.$modal.setChildElement(`<textarea class="text-input"></textarea>`);
		this.$modal.open(this.option, this.callback);
	}
}

const $textAreaModal = new TextAreaModal();

export default $textAreaModal;
