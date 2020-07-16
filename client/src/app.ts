import './styles/common.scss';
import TodoList from './pages/todoList';
import $modal from './components/modal';

// test
type pageType = 'todoList' | 'login';
const page: pageType = 'todoList';

class App {
  private container!: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.container.appendChild($modal);
    if (page === 'todoList') {
      const todoList = new TodoList();
      console.log(todoList);
      this.container.appendChild(todoList);
    }
  }
}

new App(document.querySelector('#app') as HTMLElement);

