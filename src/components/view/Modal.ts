import { View } from '../base/View';
import { IEvents } from '../base/events';

interface IModal {
	content: HTMLElement,
}
export class Modal extends View<IModal> {
	protected _content: HTMLElement;
	protected _buttonClose: HTMLElement;

	constructor(container: string | HTMLElement, protected events: IEvents) {
		super(container);
	}

	initElements() {
		this._content = this.getElement('.modal__content');
		this._buttonClose = this.getElement('.modal__close');
	}

	initEvents() {
		this._buttonClose.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}