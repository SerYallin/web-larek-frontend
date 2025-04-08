import { View } from '../base/View';
import { IEvents } from '../base/events';

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export class Form<Type> extends View<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(container: string | HTMLElement, protected events: IEvents) {
		super(container);
	}

	initElements() {
		this._submit = this.getElement('button[type=submit]') as HTMLButtonElement;
		this._errors = this.getElement('.form__errors');
	}

	initEvents() {
		if (this.container instanceof HTMLFormElement) {
			this.container.addEventListener('submit', (e: Event) => {
				e.preventDefault();
				this.events.emit(`${(this.container as HTMLFormElement).name}:submit`);
			});
			this.container.addEventListener('input', (e: Event) => {
				const target = e.target as HTMLInputElement;
				const field = target.name as keyof Type;
				const value = target.value;
				this.onInputChange(field, value);
			});
		}
	}

	protected onInputChange(field: keyof Type, value: string) {
		this.events.emit(`${(this.container as HTMLFormElement).name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string[]) {
		this.setText(this._errors, value.join(', '));
	}

	render(state: Partial<Type> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}