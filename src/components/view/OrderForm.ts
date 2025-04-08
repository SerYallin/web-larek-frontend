import { IEvents } from '../base/events';
import { Form } from './Form';
import { ensureAllElements } from '../../utils/utils';

export interface IOrderForm {
	payment: string,
	address: string,
}
export class OrderForm extends Form<IOrderForm> {
	protected _payments: HTMLElement[];
	protected _address: HTMLInputElement;

	initElements() {
		super.initElements();
		this._payments = ensureAllElements('.order__buttons .button', this.container);
		this._address = this.getElement('[name="address"]') as HTMLInputElement;
	}

	initEvents() {
		super.initEvents();
		this._payments.forEach((payment) => {
			payment.addEventListener('click', (event) => {
				if (event.target instanceof HTMLElement) {
					this.onInputChange('payment', event.target.getAttribute('name') || '');
				}
		});
	});
	}

	set payment(value: string) {
		this._payments.forEach((element: HTMLElement) => {
			if (element.getAttribute('name') === value) {
				element.classList.add('button_alt-active');
			}
			else {
				element.classList.remove('button_alt-active');
			}
		});
	}

	set address(value: string) {
		this._address.value = value;
	}
}