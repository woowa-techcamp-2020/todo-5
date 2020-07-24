import $modal, { ModalInterface, Modal } from './base-modal/modal';

class InputTextModal {
	private $modal!: Modal;
	private option!: ModalInterface;
	private callback!: Function;

	constructor() {
		this.$modal = $modal;
	}

	public open(option: ModalInterface, callback: Function) {
		this.option = option;
		this.callback = callback;
		this.$modal.setChildElement('<input class="text-input">');
		this.$modal.open(this.option, this.callback);
	}
}

const $inputTextModal = new InputTextModal();

export default $inputTextModal;
