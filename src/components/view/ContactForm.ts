import { IEvents } from '../base/events';
import { Form } from './Form';
import { ensureAllElements } from '../../utils/utils';

export interface IContactForm {
	email: string,
	phone: string,
}
export class ContactForm extends Form<IContactForm> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	initElements() {
		super.initElements();
		this._email = this.getElement('[name="email"]') as HTMLInputElement;
		this._phone = this.getElement('[name="phone"]') as HTMLInputElement;
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}