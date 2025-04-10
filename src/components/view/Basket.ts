import { View } from '../base/View';
import { IEvents } from '../base/events';
import { createElement } from '../../utils/utils';
import { EventsNames } from '../../types';

interface IBasket {
	items: HTMLElement[];
	total: number;
}
export class Basket extends View<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: string | HTMLElement, protected events: IEvents) {
		super(container);
	}

	initElements() {
		this._list = this.getElement('.basket__list');
		this._total = this.getElement('.basket__price');
		this._button = this.getElement('.basket__button') as HTMLButtonElement;
	}

	initEvents() {
		this._button.addEventListener('click', () => {
			this.events.emit(EventsNames.ORDER_OPEN);
		});
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, total ? total.toString() + ' синапсов' : '');
	}

	set buttonActive(active: boolean) {
		this._button.disabled = !active;
	}

}