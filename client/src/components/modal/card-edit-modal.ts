import $modal, { ModalInterface, Modal } from './modal';

class CardEditModal {
  private $modal!: Modal;
  private option!: ModalInterface;
  private callback!: Function;

  constructor() {
    this.$modal = $modal;
  }

  open(option: ModalInterface, callback: Function) {
    this.option = option;
    this.callback = callback;
    this.$modal.setChildElement(
      `<textarea class="text-input"></textarea>`
    )
    this.$modal.open(this.option, this.callback);
  }
}

const $cardModal = new CardEditModal();
// console.log($cardModal.opdn())

export default $cardModal;

