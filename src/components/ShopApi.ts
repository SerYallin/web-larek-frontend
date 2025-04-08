import { Api, ApiListResponse } from './base/api';
import { IEvents } from './base/events';
import { IOrder, TProduct } from '../types';
import { ISuccess } from './view/Success';

export class ShopApi extends Api {

	protected cdnUrl: string;

	protected events: IEvents;

	constructor(baseUrl: string, cdnUrl: string, events: IEvents) {
		super(baseUrl);
		this.cdnUrl = cdnUrl;
		this.events = events;
	}

	getProducts(): Promise<TProduct[]> {
		return this.get('/product').then((data: ApiListResponse<TProduct>) =>
		data.items.map((item) => ({
			...item,
			image: this.cdnUrl + item.image
		})));
	}

	sendOrder(data: IOrder): Promise<ISuccess> {
		return this.post('/order', data).then((response: any) => response);
	}

}