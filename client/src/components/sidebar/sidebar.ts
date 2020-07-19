const url = 'http://13.209.83.0';

export interface ActivityInterface {
	activity_id: number;
	service_id: number;
	card_id: number;
	user_id: number;
	uid: string;
	action: string;
	card_title: string;
	from: string;
	to: string;
	create_date: number;
}

class Sidebar extends HTMLElement {
	private state: { service_id: number };
	private activities: Array<ActivityInterface>;

	constructor(service_id: number) {
		super();
		this.state = { service_id: service_id };
		this.activities = [];
		this.getActivities();
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		this.drawActivities();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		this.innerHTML = `
        <aside class="slide-menu">
          <section>
            <div><i class="material-icons">notifications</i>Activity</div>
            <ul class=activity-list></ul>
          </section>
      </aside>`;
	}

	private async getActivities() {
		// const options = {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// };
		//const response = fetch(`${url}/api/activity/:serviceId`, options);
		const data: Array<ActivityInterface> = [
			{
				activity_id: 1,
				service_id: 1,
				card_id: 1,
				user_id: 1,
				uid: 'loloara',
				action: 'moved',
				card_title: 'card title 01 of todo',
				from: 'todo',
				to: 'doing',
				create_date: Date.now() - 500,
			},
			{
				activity_id: 2,
				service_id: 1,
				card_id: 1,
				user_id: 1,
				uid: 'addy2316',
				action: 'updated',
				card_title: 'card title 01 of todo',
				from: '',
				to: '',
				create_date: Date.now() - 3000,
			},
		];
		this.activities = data;
	}

	private drawActivities() {
		const ulTag = this.querySelector('ul') as HTMLElement;
		ulTag.innerHTML = this.activities.reduce(
			(result: string, item: ActivityInterface) =>
				(result += `<li><span class="etext">@${item.uid}</span> ${
					item.action
				} <span class="etext">${item.card_title}</span> ${
					item.action === 'moved' || item.action === 'archived' ? ' from ' + item.from : ''
				}${
					item.action === 'moved' || item.action === 'added' ? ' to ' + item.to : ''
				}</li><span class="time-label">${this.calDifTime(item.create_date)} 전 작성</span>`),
			''
		);
	}

	private calDifTime(time: number) {
		const currentTime = Date.now();
		let result: number | string = currentTime - time;
		let timeForm = '';
		if (result <= 10) {
			result = '방금';
		} else if (result < 60) {
			timeForm = '초';
		} else if (result < 3600) {
			result /= 60;
			result = result.toFixed();
			timeForm = '분';
		} else if (result < 86400) {
			result /= 3600;
			result = result.toFixed();
			timeForm = '시간';
		} else {
			result /= 86400;
			result = result.toFixed();
			timeForm = '일';
		}
		return result + timeForm;
	}
}

window.customElements.define('sidebar-element', Sidebar);

export default customElements.get('sidebar-element');
