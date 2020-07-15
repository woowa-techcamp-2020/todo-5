import Card from '../card';

class Column extends HTMLElement{
  private state : {} = {};
  private card!: HTMLElement;

  constructor() {
    super();
    this.card = new Card();
  }


  connectedCallback() {
    // DOM에 추가되었다. 렌더링 등의 처리를 하자.
    this.render();
    this.appendChild(this.card);
  }

  disconnectedCallback() {
    // DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
    this.remove();
  } 

  attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
    this.render(); 
  }

  render() {
    this.innerHTML = `<div class="column"></div>`;
  }
}


window.customElements.define("column-element", Column);

export default customElements.get('column-element');