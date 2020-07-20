import $modal, { ModalInterface, Modal } from './modal';

class TopicEditModal {
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
      '<input class="text-input" />'
    )
    this.$modal.open(this.option, this.callback);
  }
}

const $topicModal = new TopicEditModal();

export default $topicModal;

