interface modalType {
  title: string;
  content: string;
  resolve?: string;
  reject?: string;
}


class Modal extends HTMLElement{
  private state : modalType = {
    title: '',
    content: '',
    resolve: '확인',
    reject: '취소'
  };

  private callback = () => {};

  constructor(callback: () => {}, option: modalType) {
    super();
    this.state = option;
    this.callback = callback;
  }

  listener() {
    const reject = this.querySelector('.reject-btn');
    const resolve = this.querySelector('.resolve-btn');
    reject?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.remove();
    })
    resolve?.addEventListener('click', async (e) => {
      e.stopPropagation();
      resolve.setAttribute('disabled', 'true');
      await this.callback();
      resolve.removeAttribute('disabled');
      this.remove();
    })
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
    this.innerHTML = `
    <div class="modal-area modal-close" id="modal">
      <div class="modal-container">
        <div class="title text-ellipsis">${this.state.title}</div>
        <div class="content">${this.state.content}</div>
        <div class="button-zone">
          <div class="button reject-btn">${this.state.reject}</div>
          <div class="button resolve-btn">${this.state.resolve}</div>
        </div>
      </div>
    </div>
    `;
  }
}

window.customElements.define("modal-element", Modal);

const modalElement = new (customElements.get('modal-element'));

const modal = {
  modalElement,
  open() {

  },
  close() {
    
  }
}
export default customElements.get('modal-element');


//uicomponent는 따로 모아둬서 app.ts에 가져다 놓고 써야겠다.