export class Options {
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
	static PATCH(body: JSON | any) {
		return {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
	}
	static PUT(body: JSON | any) {
		return {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
	}
}

// TODO
// @ts-ignore
export const url = `${process.env.URL || 'http://localhost'}:${process.env.PORT || '3000'}`;
export const ORDER_WEIGHT = 100000;
export const DUMMY_USER = 1;
