import { View } from '../base/View';
import { IEvents } from '../base/events';
import { EventsNames } from '../../types';

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

	_toggleModal(state = true) {
		this.container.classList.toggle('modal_active', state);
	}

	_handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};

	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}

	open() {
		this._toggleModal(); // открываем
		// навешиваем обработчик при открытии
		document.addEventListener('keydown', this._handleEscape);
		this.events.emit(EventsNames.MODAL_OPEN);
	}

	close() {
		this._toggleModal(false); // закрываем
		// правильно удаляем обработчик при закрытии
		document.removeEventListener('keydown', this._handleEscape);
		this.content = null;
		this.events.emit(EventsNames.MODAL_CLOSE);
	}

	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}