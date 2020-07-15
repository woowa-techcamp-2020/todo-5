import './styles/common.scss';
import TodoList from './pages/todoList';

// test
type pageType = 'todoList' | 'login';
const page: pageType = 'todoList';

class App {
  private container!: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    if (page === 'todoList') {
      const todoList = new TodoList();
      console.log(todoList);
      this.container.appendChild(todoList);
    }
  }
}

new App(document.querySelector('#app') as HTMLElement);

