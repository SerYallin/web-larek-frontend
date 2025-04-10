import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';

import { ShopApi } from './components/ShopApi';
import { EventEmitter } from './components/base/events';
import { AppState, knownCategories } from './components/AppState';
import { Page } from './components/view/Page';
import { EventsNames, OrderStatus, TProduct } from './types';
import {
	Product,
	ProductBasket,
	ProductPreview,
	TProductBasket,
} from './components/view/Product';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { IOrderForm, OrderForm } from './components/view/OrderForm';
import { ContactForm } from './components/view/ContactForm';
import { Order } from './components/Order';
import { ISuccess, Success } from './components/view/Success';

const events = new EventEmitter();

const shopApi = new ShopApi(API_URL, CDN_URL, events);

const state = new AppState({}, events);

const page = new Page('.page', events);
const modal = new Modal('#modal-container', events);


const busket = new Basket('#basket', events);
const order = new OrderForm('#order', events);
const contacts = new ContactForm('#contacts', events);
const success = new Success('#success', events);

busket.buttonActive = false;

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
})


state.setCategories(knownCategories);

page.counter = 0;

events.on(EventsNames.PRODUCTS_CHANGED, () => {
	page.products = state.products.getItems().map((item: TProduct) => {
		const product = new Product('#card-catalog', events);
		return product.render(item);
	});
});

events.on(EventsNames.PRODUCT_CATEGORY_SET, (product:Product) => {
	product.categoryClass = state.categories.getItem(product.category).slug;
});

events.on(EventsNames.PRODUCT_PREVIEW, (product:Product) => {
	state.setPreview(product);
});

events.on(EventsNames.PRODUCT_PREVIEW_CHANGED, (product:Product) => {

	const data = state.products.getItem(product.id);

	const card = new ProductPreview('#card-preview', events);

	modal.render({
		content: card.render(data)
	});
});

events.on(EventsNames.BASKET_OPEN, () => {
	modal.render({
		content: busket.render(),
	});
});
events.on(EventsNames.BASKET_ADD, (product:Product) => {
	if (!state.basket.includes(product.id)) {
		state.basket.push(product.id);
		events.emit(EventsNames.BASKET_CHANGED);
		modal.close();
	}
});

events.on(EventsNames.BASKET_DELETE, (data: ProductBasket<TProductBasket>) => {
	state.basket.splice(data.index, 1);
	events.emit(EventsNames.BASKET_CHANGED);
});

events.on(EventsNames.BASKET_CHANGED, () => {
	page.counter = state.totalCount;
	busket.items = state.basket.map((itemId: string, index: number) => {
		const product: TProduct = state.products.getItem(itemId);
		const productBasket = new ProductBasket('#card-basket', events);
		return productBasket.render({
			id: product.id,
			title: product.title,
			price: product.price,
			index: index + 1
		})});
	busket.total = state.totalPrice;
	busket.buttonActive = state.basket.length > 0
});

// Блокируем прокрутку страницы если открыта модалка
events.on(EventsNames.MODAL_OPEN, () => {
	page.locked = true;
});

// Разлокируем прокрутку страницы если открыта модалка
events.on(EventsNames.MODAL_CLOSE, () => {
	page.locked = false;
});

events.on(EventsNames.ORDER_OPEN, () => {
	if (state.basket.length === 0) {
		return;
	}
	modal.render({
		content: order.render({
			payment: '',
			address: '',
			valid: false,
			errors: []
		})
	});
	state.order.update({items: state.basket, total: state.totalPrice});
	state.order.setStatus(OrderStatus.CREATED);
});

events.on(EventsNames.ORDER_CHANGE, (data: Order) => {
	order.render({
		payment: data.payment,
		address: data.address,
		valid: data.getErrors().length === 0,
		errors: data.getErrors()
	});
});

events.on(EventsNames.CONTACTS_CHANGE, (data: Order) => {
	contacts.render({
		email: data.email,
		phone: data.phone,
		valid: data.getErrors().length === 0,
		errors: data.getErrors()
	});
});

events.on(EventsNames.ORDER_FIELD_CHANGE, (data: { field: keyof IOrderForm, value: string }) => {
	state.setOrderField(data.field, data.value);
});

events.on(EventsNames.CONTACTS_FIELD_CHANGE, (data: { field: keyof IOrderForm, value: string }) => {
	state.setContactsField(data.field, data.value);
});

events.on(EventsNames.ORDER_SUBMIT, () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: []
		})
	});
});

events.on(EventsNames.CONTACTS_SUBMIT, () => {
	shopApi.sendOrder(state.order).then((result: ISuccess) => {
		modal.render({
			content: success.render(result)
		});
		state.order.setStatus(OrderStatus.COMPLETED);
		state.clearOrder();
		state.clearBasket();
	}).catch(err => {
		state.order.setStatus(OrderStatus.ERROR);
		console.error(err);
	});
});

events.on(EventsNames.SUCCESS_CLOSE, () => {
	modal.close();
})

shopApi.getProducts().then((products) => {
	state.setProducts(products)
})
	.catch(console.error);