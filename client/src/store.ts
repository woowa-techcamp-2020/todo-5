class Store {
	private state: any = {};
	setState(type: string, data: any) {
		this.state[type] = data;
	}

	getState(type: string) {
		return this.state[type];
	}
}

const store = new Store();

export default store;
