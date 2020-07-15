import Column from '../../components/column';
import Header from '../../components/header';
import Menu from '../../components/menu';

class TodoList extends HTMLElement{
  private state : {} = {};
  private header!: HTMLElement;
  private menu!: HTMLElement;
  private column!: HTMLElement;

  constructor() {
    super();
    this.header = new Header();
    this.column = new Column();
    this.menu = new Menu();
    // this.render();
  }


  connectedCallback() {
    // DOM에 추가되었다. 렌더링 등의 처리를 하자.
    this.render();
    console.log('render');
    this.appendChild(this.header);
    this.appendChild(this.column);
    this.appendChild(this.menu);
  }

  disconnectedCallback() {
    // DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
    this.remove();
  } 

  attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
    this.render(); 
  }

  render() {
    this.innerHTML = `<div class="todo-list">todoList111</div>`;
  }
}


window.customElements.define("todo-page", TodoList);

export default customElements.get('todo-page');