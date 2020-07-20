class Options {
	constructor() {}
	static GET() {
		return {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
	}
	static POST(body: JSON | any) {
		return {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
	}
}

export default Options;
