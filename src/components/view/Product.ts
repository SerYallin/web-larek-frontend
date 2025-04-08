import { View } from '../base/View';
import { IEvents } from '../base/events';
import { TProduct } from '../../types';

export type TProductBasket = Pick<TProduct, 'id' | 'title' | 'price'> & { index: number }

export class Product extends View<TProduct>{

	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _image: HTMLElement;
	protected _price: HTMLElement;


	constructor(container: string | HTMLElement, protected events: IEvents){
		super(container);
	}

	initElements() {
		this._category = this.getElement('.card__category');
		this._title = this.getElement('.card__title');
		this._image = this.getElement('.card__image');
		this._price = this.getElement('.card__price');
	}

	initEvents() {
		this.container.addEventListener('click', () => {
			this.events.emit('product:preview', this);
		})
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.events.emit('product:category-set', this)
	}

	get category() {
		return this._category.textContent;
	}

	set categoryClass(value: string) {
		this._category.classList.add('card__category_' +value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImageUrl(this._image, value);
	}

	set price(value: number) {
		this.setText(this._price, value ? (value >= 10000 ? value.toLocaleString('ru-RU') : value.toString()) + ' синапсов' : 'Бесценно');
	}

	set id(value: string) {
		this.container.setAttribute('id', value);
	}

	get id() {
		return this.container.getAttribute('id');
	}

}

export class ProductPreview extends Product {
	protected _description: HTMLElement;
	protected _button: HTMLElement;

	initElements() {
		super.initElements();
		this._description = this.getElement('.card__text');
		this._button = this.getElement('.card__button');
	}

	initEvents() {
		this._button.addEventListener('click', () => {
			this.events.emit('basket:add', this);
		})
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}

export class ProductBasket<TProductBasket> extends Product {
	protected _index: HTMLElement;
	protected _button: HTMLElement;

	initElements() {
		this._index = this.getElement('.basket__item-index');
		this._title = this.getElement('.card__title');
		this._price = this.getElement('.card__price');
		this._button = this.getElement('.card__button');
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}

	get index() {
		return parseInt(this._index.textContent) - 1 || 0;
	}

	initEvents() {
		this._button.addEventListener('click', () => {
			this.events.emit('basket:delete', this);
		});
	}

	render(data?: Partial<TProductBasket>): HTMLElement {
		return super.render(data);
	}
}