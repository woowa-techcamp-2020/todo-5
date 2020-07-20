import {$cardModal} from '../modal';

export interface CardInterface {
	card_id: number;
	order_weight: number;
	title: string;
	user_name: string;
	content: string;
	last_update: number;
	create_date: number;
	user_id: number;
	topic_id: number;
}

class Card extends HTMLElement {
	private state: CardInterface;

	constructor(data: CardInterface) {
		super();
		this.state = data;
	}

	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.render();
		this.listener();
	}

	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.remove();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
		this.listener();
	}

	listener() {
		const del = this.querySelector('.delete') as HTMLElement;
		del.addEventListener('click', (e) => {
			e.stopPropagation();
			console.log('delete');
			if (confirm('선택하신 카드를 삭제하시겠습니까?')) {
				this.remove();
				//soft delete api call
			}
		});
		this.querySelector('.card')?.addEventListener('dblclick', (e) => {
			e.stopPropagation();
			$cardModal.open(
				{
					title: 'Edit',
					content: this.state.content,
					resolve: 'Save',
					reject: 'Cancel',
				},
				() => {
					console.log('cccc');
				}
			);
		});
	}

	render() {
		this.innerHTML = `<div class="card">
      <div class="card-title">
        <span>${this.state.title}</span>
        <i class="material-icons icon delete">close</i>
      </div>
      <div class="card-user">by <span>${this.state.user_name}</span></div>
      <div class="card-content">${this.state.content}</div>
    </div>`;
	}
}

window.customElements.define('card-element', Card);

export default customElements.get('card-element');
