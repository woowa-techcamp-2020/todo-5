import './styles/common.scss';
import TodoList from './pages/todo-list';
import $modal from './components/modal';
import store from './store';

// test
type pageType = 'todoList' | 'login';
const page: pageType = 'todoList';

class App {
	private container!: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
		store.init(this.container);

		if (page === 'todoList') {
			store.setState('user_id', 1);
			store.setState('service_id', 1);
			store.setState('uid', 'loloara');
			const todoList = new TodoList();
			this.container.appendChild(todoList);
		}
		this.container.appendChild($modal);
	}
}

new App(document.querySelector('#app') as HTMLElement);
