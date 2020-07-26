class Store {
	private state: any = {};
	private container!: HTMLElement;

	init(container: HTMLElement) {
		this.container = container;
	}
	setState(type: string, data: any) {
		if (!this.container) return;
		this.state[type] = data;
	}

	getState(type: string) {
		if (!this.container) return;
		return this.state[type];
	}

	on(type: string, fn: Function) {
		if (!this.container) return;
		this.container.addEventListener(type, () => fn);
	}

	emit(event: Event) {
		this.container.dispatchEvent(event);
	}
}

const store = new Store();

export default store;
