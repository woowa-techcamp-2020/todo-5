class Menu extends HTMLElement{
  private state : {} = {};

  constructor() {
    super();
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
    this.innerHTML = `<div>menu</div>`;
  }
}


window.customElements.define("menu-element", Menu);

export default customElements.get('menu-element');