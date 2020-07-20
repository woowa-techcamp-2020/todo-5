import './styles/common.scss';
import TodoList from './pages/todo-list';
import $modal from './components/modal';

// test
type pageType = 'todoList' | 'login';
const page: pageType = 'todoList';

class App {
	private container!: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
		if (page === 'todoList') {
			const todoList = new TodoList();
			this.container.appendChild(todoList);
		}
		this.container.appendChild($modal);
	}
}

new App(document.querySelector('#app') as HTMLElement);
