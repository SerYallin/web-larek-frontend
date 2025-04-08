import { AppInterface, ICollection, TCategory, TProduct } from '../types/index';
import { Model } from './base/Model';
import { Collection } from './base/Collection';
import { Product } from './view/Product';
import { IOrderForm } from './view/OrderForm';
import { IEvents } from './base/events';
import { Order } from './Order';

export const knownCategories : TCategory[] = [
	{
		id: 'софт-скил',
		slug: 'soft',
		title: 'софт-скил'
	},
	{
		id: 'хард-скил',
		slug: 'hard',
		title: 'хард-скил'
	},
	{
		id: 'дополнительное',
		slug: 'additional',
		title: 'дополнительное'
	},
	{
		id: 'кнопка',
		slug: 'button',
		title: 'кнопка'
	},
	{
		id: 'другое',
		slug: 'other',
		title: 'другое'
	}
];

export class AppState extends Model<AppInterface>{
	products: ICollection<TProduct>
	categories: ICollection<TCategory>
	basket: string[] = [];
	activeProduct: string | null = null
	order: Order

	constructor(data: Partial<AppInterface>, events: IEvents) {
		super(data, events);

		if (!this.order) {
			this.order = new Order({
				payment: '',
				email: '',
				phone: '',
				address: '',
				total: 0,
				items: []
			}, events);
		}
	}

	setProducts(products: TProduct[]){
		this.products = new Collection<TProduct>(products);
		this.emitChanges('products:changed', this.products.getItems());
	}

	setCategories(categories: TCategory[]){
		this.categories = new Collection<TCategory>(categories);
	}

	setPreview(product: Product) {
		this.activeProduct = product.id;
		this.emitChanges('preview:changed', product);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order.update({[field]: value});

		this.validateOrderStep();
	}
	setContactsField(field: keyof IOrderForm, value: string) {
		this.order.update({[field]: value});

		this.validateContactStep();
	}

	validateOrderStep() {
		this.order.errors = [];
		if (!this.order.payment) {
			this.order.addError('Необходимо указать тип оплаты');
		}
		if (!this.order.address) {
			this.order.addError('Необходимо указать адрес доставки');
		}
		this.events.emit('order:change', this.order);
	}

	validateContactStep() {
		this.order.errors = [];
		const expressionEmail = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
		const expressionPhone = /\+?7\(?[0-9]{3}\)?[\s|-]?[0-9]{3}[\s|-]?[0-9]{2}[\s|-]?[0-9]{2}/;
		if (!this.order.email) {
			this.order.addError('Необходимо указать eмейл');
		}
		else if (!expressionEmail.test(this.order.email)) {
			this.order.addError('Неверный формат почты');
		}
		if (!this.order.phone) {
			this.order.addError('Необходимо указать номер телефона');
		}
		else if (!expressionPhone.test(this.order.phone)) {
			this.order.addError('Неверный формат телефона, например +7 (000) 000-00-00');
		}
		this.events.emit('contacts:change', this.order);
	}

	clearOrder() {
		this.order.update({
			payment: '',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: []
		})
	}

	clearBasket() {
		this.basket = [];
		this.emitChanges('basket:changed');
	}

	get totalPrice(): number {
		if (this.basket.length) {
			return this.basket
				.reduce((total: number, id: string) => total + this.products.getItem(id).price, 0);
		}
		else {
			return 0;
		}
	}

	get totalCount(): number {
		return this.basket.length || 0;
	}

}
