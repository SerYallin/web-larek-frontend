import { Model } from './base/Model';
import { IOrder, OrderStatus } from '../types';
import { IEvents } from './base/events';

export class Order extends Model<IOrder>{

	payment: string;
	address: string;
	email: string;
	phone: string;
	status: OrderStatus;
	errors: string[];
	items: string[];
	total: number;

	constructor(data: Partial<IOrder>, events: IEvents) {
		super(data, events);
		this.errors = [];
		this.items = [];
	}

	/**
	 * Update order according to the data.
	 *
	 * @param {object} data
	 *   Order data.
	 */
	update(data: Partial<IOrder>): void {
		Object.assign(this, data);
	};

	/**
	 * Set new order status.
	 *
	 * @param {OrderStatus} status
	 *   New order status.
	 */
	setStatus(status: OrderStatus): void {
		this.status = status;
	}

	/**
	 * Get order status.
	 *
	 * @returns {string}
	 *   Order status.
	 */
	getStatus(): string {
		return this.status
	}

	/**
	 * Add new order error.
	 *
	 * @param {string} error
	 *   Order error message.
	 */
	addError(error: string): void {
		this.errors.push(error);
	}

	/**
	 * Get order errors.
	 *
	 * @returns {string[]}
	 *   Order errors.
	 */
	getErrors(): string[] {
		return this.errors
	}

}