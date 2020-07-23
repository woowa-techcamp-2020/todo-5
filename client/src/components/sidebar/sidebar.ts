import { ActivityApi } from '../../api';
import { ActivityDTO } from '../../../../shared/dto';
import store from '../../store';

interface ActivityInterface {
	activity_id: number;
	service_id: number;
	card_id: number;
	user_id: number;
	uid: string;
	action: string;
	content: string;
	from_topic: string;
	to_topic: string;
	create_date: number;
}

const action = ['add', 'remove', 'update', 'move'];

class Sidebar extends HTMLElement {
	private state: { service_id: number };
	private activities: Array<ActivityInterface>;

	constructor(service_id: number) {
		super();
		this.state = { service_id: service_id };
		this.activities = [];
	}

	async connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		await this.getActivities();
		this.drawActivities();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	appendListener() {
		const close = this.querySelector('.close-icon') as HTMLElement;
		const toggle = document.querySelector('#toggle') as HTMLInputElement;

		close.addEventListener('click', (event) => {
			event.stopPropagation();
			toggle.checked = false;
			toggle.dispatchEvent(new Event('change'));
		});
		store.setState('newActivity', async () => {
			await this.getActivities();
			this.drawActivities();
		});
	}

	render() {
		this.innerHTML = `
        <aside class="slide-menu">
          <section>
						<div class="menu-title">
							<div class="title-wrapper">
								<i class="material-icons">notifications</i>
								<div>ACTIVITY</div>
							</div>
							<i class="material-icons close-icon">close</i>
						</div>
						<div class="update-activity"> View new activity</div>
            <ul class=activity-list></ul>
          </section>
			</aside>`;
	}

	private async getActivities() {
		try {
			const data = await ActivityApi.getActivitiesByServiceId(store.getState('service_id'));
			this.activities = data.result;
		} catch (err) {
			// alert(`데이터를 로드할 수 없습니다.`);
			console.log(err);
		}
	}

	private drawActivities() {
		const ulTag = this.querySelector('ul') as HTMLElement;
		ulTag.innerHTML = this.activities.reduce(
			(result: string, item: ActivityInterface) => (result += this.createActivityLog(item)),
			''
		);
	}

	createActivityLog(item: ActivityInterface) {
		return `<div class="activity-content">
			<li>
				<span class="etext">@${item.uid}</span>
				${item.action}
				<span class="etext">${item.content ? item.content.split(`<br/>`)[0] : ''}</span>
				${this.checkFromTopic(item.action, item.from_topic)} ${this.checkToTopic(
			item.action,
			item.to_topic
		)}
			</li>
			<span class="time-label">${this.calDifTime(item.create_date)} 전 작성</span>
		</div>`;
	}

	checkFromTopic(action: string, from_topic: string) {
		if (action === ActivityDTO.Action.MOVE || action === ActivityDTO.Action.REMOVE) {
			return `from <span class="topic-name">${from_topic}</span>`;
		}
		if (action === ActivityDTO.Action.TOPICREMOVE || action === ActivityDTO.Action.TOPICREMOVE) {
			return `<span class="etext">${from_topic}</span>`;
		}
		return '';
	}

	checkToTopic(action: string, to_topic: string) {
		if (action === ActivityDTO.Action.MOVE || action === ActivityDTO.Action.ADD) {
			return `to <span class="topic-name">${to_topic}</span>`;
		}
		if (action === ActivityDTO.Action.TOPICADD || action === ActivityDTO.Action.TOPICUPDATE) {
			return `<span class="etext">${to_topic}</span>`;
		}
		return '';
	}

	private calDifTime(time: number) {
		const currentTime = Math.floor(Date.now() / 1000);
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

export { ActivityInterface, Sidebar };
