import { IView } from "../../types";
import { cloneTemplate, ensureElement, setElementData } from '../../utils/utils';

/**
 * View base class.
 */
export abstract class View<Type> implements IView{


	/**
	 * View container.
	 *
	 * @type {HTMLElement}
	 * @protected
	 */
	protected container: HTMLElement;

	/**
	 * View constructor.
	 *
	 * @protected
	 *
	 * @param container
	 */
	protected constructor(container: string | HTMLElement){
		if (typeof container === 'string') {
			container = ensureElement(container);
		}

		this.container = container instanceof HTMLTemplateElement ?
			cloneTemplate(container) : container;

		this.initElements();
		this.initEvents();
	}

	abstract initElements():void;

	abstract initEvents():void;

	/**
	 * View render.
	 */
	public render(data?: Partial<Type>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}

	setText(selector: string | HTMLElement, text: string) {
		this.getElement(selector).textContent = text;
	}

	setImageUrl(selector: string | HTMLElement, url: string) {
		this.getElement(selector).setAttribute('src', url);
	}

	getElement(selector?: string | HTMLElement): HTMLElement {
		return selector ?
			ensureElement(selector, this.container) :
			this.container;
	}
}