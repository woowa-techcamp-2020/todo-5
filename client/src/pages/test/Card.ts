import '../styles/common.scss';
class Card extends HTMLElement {

  private state : {
    desc: string
  } = {
    desc: ''
  };

  constructor() {
    super();
    this.addEventListener('click', e => {
      console.log('click!11');
    });
  }

  connectedCallback() {
    // DOM에 추가되었다. 렌더링 등의 처리를 하자.
    this.render();
    const btn = this.querySelector('button') as HTMLButtonElement;
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if(btn.textContent === 'click') {
        btn.textContent = 'stop';
      } else {
        btn.textContent = 'click';
      }
    });
  }

  disconnectedCallback() {
    // DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
    alert('bb');
  } 

  attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
    this.render(); 
  }

  get open() {
    return this.hasAttribute('open');
  }

  get disabled() {
    // @ts-ignore
    return this.hasAttributes('disabled');
  }


  render() {
    // 이거 꼭 텍스트로 해야하는가?
    this.innerHTML = `<div class="todoList-content">
      <div>${this.state.desc}</div>
      <button>click</button>
    </div>`;
  }
}


// 엘ㄹ먼트 이름에 꼭 '-'가 포함되어야 한다.
window.customElements.define("card-template", Card);

export default customElements.get('card-template');

// export default Card;
