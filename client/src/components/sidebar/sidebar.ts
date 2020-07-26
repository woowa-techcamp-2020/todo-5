import { ActivityApi } from '../../api';
import { ActivityDTO } from '../../../../shared/dto';
import store from '../../store';

export interface ActivityInterface {
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
	card_title?: string;
}

class Sidebar extends HTMLElement {
	private state: { service_id: number };
	private activities: Array<ActivityInterface> = [];
	private page = 0;
	private max = 0;
	private getLoading = false;

	constructor(service_id: number) {
		super();
		this.state = { service_id };
		this.activities = [];
	}

	connectedCallback() {
		this.render();
		this.init();
	}

	disconnectedCallback() {
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	/** 부모(page)가 listener를 등록합니ㅣ다.
	 * todo
	 * 구조 개선
	 */
	public appendListener() {
		const close = this.querySelector('.close-icon') as HTMLElement;
		const toggle = document.querySelector('#toggle') as HTMLInputElement;
		const list = this.querySelector('.activity-list') as HTMLElement;

		close.addEventListener('click', () => this.closeClickEventHandler(toggle));
		list.addEventListener('scroll', async () =>
			(await this.listScrollEventHandler(list)).bind(this)
		);
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

	private async init() {
		await this.getActivities();
		this.drawActivities();

		const list = this.querySelector('.activity-list') as HTMLElement;
		store.setState('newActivity', (activity: ActivityInterface) => {
			this.activities.unshift(activity);
			this.drawActivities();
			list.scrollTop = 0;
		});
	}

	private closeClickEventHandler(toggle: HTMLInputElement): void {
		toggle.checked = false;
		toggle.dispatchEvent(new Event('change'));
	}

	private async listScrollEventHandler(list: HTMLElement): Promise<any> {
		if (list.clientHeight + list.scrollTop > list.scrollHeight - 100) {
			if (!this.getLoading) {
				this.getLoading = true;
				await this.getActivitiesByPagination();
				this.getLoading = false;
			}
		}
	}

	private async getActivities() {
		try {
			const numResult = await ActivityApi.getMaxpageNumber(store.getState('service_id'));
			this.max = numResult.result[0].activity_id;
			await this.getActivitiesByPagination();
		} catch (err) {
			console.error(err);
		}
	}

	private async getActivitiesByPagination() {
		const result = await ActivityApi.getActivitiesByPagination(
			store.getState('service_id'),
			this.max,
			this.page
		);
		this.activities = this.activities.concat(result.result);
		this.drawActivities();
		this.page += 1;
	}

	private drawActivities() {
		const ulTag = this.querySelector('ul') as HTMLElement;
		ulTag.innerHTML = this.activities.reduce(
			(result: string, item: ActivityInterface) => (result += this.createActivityLog(item)),
			''
		);
	}

	private createActivityLog(item: ActivityInterface) {
		return `<div class="activity-content">
			<li>
				<span class="etext">@${item.uid}</span>
				${item.action}
				<span class="etext">${
					item.card_title ? item.card_title : item.content ? item.content.split('\n')[0] : ''
				}</span>
				${this.checkFromTopic(item.action, item.from_topic)} ${this.checkToTopic(
			item.action,
			item.to_topic
		)}
			</li>
			<span class="time-label">${this.calDifTime(item.create_date)} 전 작성</span>
		</div>`;
	}

	private checkFromTopic(action: string, from_topic: string) {
		if (action === ActivityDTO.Action.MOVE || action === ActivityDTO.Action.REMOVE) {
			return `from <span class="topic-name">${from_topic}</span>`;
		}
		if (action === ActivityDTO.Action.TOPICREMOVE || action === ActivityDTO.Action.TOPICREMOVE) {
			return `<span class="etext">${from_topic}</span>`;
		}
		return '';
	}

	private checkToTopic(action: string, to_topic: string) {
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
