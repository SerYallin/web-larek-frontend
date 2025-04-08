import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';

import { ShopApi } from './components/ShopApi';
import { EventEmitter } from './components/base/events';
import { AppState, knownCategories } from './components/AppState';
import { Page } from './components/view/Page';
import { OrderStatus, TProduct } from './types';
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

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
})


state.setCategories(knownCategories);

page.counter = 0;

events.on('products:changed', () => {
	page.products = state.products.getItems().map((item: TProduct) => {
		const product = new Product('#card-catalog', events);
		return product.render(item);
	});
});

events.on('product:category-set', (product:Product) => {
	product.categoryClass = state.categories.getItem(product.category).slug;
});

events.on('product:preview', (product:Product) => {
	state.setPreview(product);
});

events.on('preview:changed', (product:Product) => {

	const data = state.products.getItem(product.id);

	const card = new ProductPreview('#card-preview', events);

	modal.render({
		content: card.render(data)
	});
});

events.on('bucket:open', () => {
	modal.render({
		content: busket.render(),
	});
});
events.on('basket:add', (product:Product) => {
	if (!state.basket.includes(product.id)) {
		state.basket.push(product.id);
		events.emit('basket:changed');
		modal.close();
	}
});

events.on('basket:delete', (data: ProductBasket<TProductBasket>) => {
	state.basket.splice(data.index, 1);
	events.emit('basket:changed');
});

events.on('basket:changed', () => {
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
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// Разлокируем прокрутку страницы если открыта модалка
events.on('modal:close', () => {
	page.locked = false;
});

events.on('order:open', () => {
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

events.on('order:change', (data: Order) => {
	order.render({
		payment: data.payment,
		address: data.address,
		valid: data.getErrors().length === 0,
		errors: data.getErrors()
	});
});

events.on('contacts:change', (data: Order) => {
	contacts.render({
		email: data.email,
		phone: data.phone,
		valid: data.getErrors().length === 0,
		errors: data.getErrors()
	});
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
	state.setOrderField(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
	state.setContactsField(data.field, data.value);
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: []
		})
	});
});

events.on('contacts:submit', () => {
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

events.on('success:close', () => {
	modal.close();
})

shopApi.getProducts().then((products) => {
	state.setProducts(products)
})
	.catch((error) => {
		console.error(error);
	});