import { View } from '../base/View';
import { IEvents } from '../base/events';
import { EventsNames } from '../../types';

interface IPage {
	counter: number;
	products: HTMLElement[];
	locked: boolean;
}
export class Page extends View<IPage> {
	/**
	 * Bucket counter element.
	 *
	 * @type {HTMLElement}
	 * @protected
	 */
	protected _counter: HTMLElement;

	/**
	 * Bucket element.
	 *
	 * @type {HTMLElement}
	 * @protected
	 */
	protected _bucket: HTMLElement;

	/**
	 * Products wrapper element.
	 *
	 * @type {HTMLElement}
	 * @protected
	 */
	protected _products: HTMLElement;

	/**
	 * Page wrapper element.
	 *
	 * @type {HTMLElement}
	 * @protected
	 */
	protected _wrapper: HTMLElement;

	constructor(container: string | HTMLElement, protected events: IEvents) {
		super(container);
	}

	initElements() {
		this._wrapper = this.getElement('.page__wrapper');
		this._counter = this.getElement('.header__basket-counter');
		this._bucket = this.getElement('.header__basket');
		this._products = this.getElement('.gallery');
	}

	initEvents() {
		this._bucket.addEventListener('click', () => {
			this.events.emit(EventsNames.BASKET_OPEN);
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set products(products: HTMLElement[]) {
		this._products.replaceChildren(...products);
	}

	set locked(value: boolean) {
		this._wrapper.classList.toggle('page__wrapper_locked', value);
	}
}