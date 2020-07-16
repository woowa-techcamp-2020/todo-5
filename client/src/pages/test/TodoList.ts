// type 지정; 스키마라고 해야하나
import '../styles/common.scss';

class TodoList {

  private container!: HTMLElement;
  private state : {
    desc: string
  } = {
    desc: ''
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.click();
  }

  set text(desc: string) {
    this.state.desc = desc;
    this.render();
  }

  private render() {
    this.container.innerHTML = this.markUp();
  }

  public click() {
    const btn = document.querySelector('button');
    btn?.addEventListener('click', () => {
      btn.textContent = 'stop';
    });
    console.log('asdfasdf');
  }

  private markUp(): string {
    return `<div class="todoList-content">
      <div>${this.state.desc}</div>
      <button onChange='${this.click()}'>click</button>
    </div>`;
  }
  
}

export default TodoList;