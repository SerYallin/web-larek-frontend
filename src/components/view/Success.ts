import { View } from '../base/View';
import { IEvents } from '../base/events';
import { EventsNames } from '../../types';

export interface ISuccess{
	total: number;
}
export class Success extends View<ISuccess> {
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: string | HTMLElement, protected events: IEvents) {
		super(container);
	}
	initElements() {
		this._total = this.getElement('.order-success__description');
		this._button = this.getElement('.button') as HTMLButtonElement;
	}

	set total(value: number) {
		const valueStr = value ? (value >= 10000 ? value.toLocaleString('ru-RU') : value.toString()) : 0;
		this.setText(this._total, `Списано ${valueStr} синапсов`);
	}

	initEvents() {
		this._button.addEventListener('click', () => {
			this.events.emit(EventsNames.SUCCESS_CLOSE);
		});
	}
}