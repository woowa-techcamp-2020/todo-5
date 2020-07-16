import $modal from '../modal';

class Card extends HTMLElement{
  private state : {
    title: string,
    content: string,
    user: string,
  } = {
    title: '',
    content: '',
    user: ''
  };

  private modal!: HTMLElement;

  constructor() {
    super();

    // this.modal = new Modal(() => {
    //   console.log('bye');
    // }, {
    //   title: 'title1',
    //   content: 'content1',
    //   resolve: 'OK',
    //   reject: 'cancel'
    // });
    this.state.title='Card title';
    this.state.content='Greyhound divisively hello coldly wonderfully marginally far upon excluding.';
    this.state.user='my Name';
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
      }
    });
    this.querySelector('.card')?.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      $modal.open({
        title: 'title',
        content: 'content',
        resolve: 'OK',
        reject: 'cancel'
      }, () => {
        console.log('cccc');
      });
      // this.appendChild(this.modal);
      // this.$modal.open();
      // this.modal.open(() => {
      //  수정하는 창 열기
      //  얘의 정보를 가져다 줘야 하나? 그렇다
      // });
    });
  }

  render() {
    this.innerHTML = 
    `<div class="card">
      <div class="card-title">
        <span>${this.state.title}</span>
        <i class="material-icons icon delete">close</i>
      </div>
      <div class="card-user">by <span>${this.state.user}</span></div>
      <div class="card-content">${this.state.content}</div>
    </div>`;
  }
}


window.customElements.define("card-element", Card);

export default customElements.get('card-element');