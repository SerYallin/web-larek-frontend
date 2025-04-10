import { Order } from '../components/Order';

type TCollectionItem = {
	id: string,
	title: string
}

/**
 * Product item type.
 */
type TProduct = TCollectionItem & {

	/**
	 * Product id.
	 */
	id: string,

	/**
	 * Product price.
	 */
	price: number,

	/**
	 * Product description.
	 */
	description: string,

	/**
	 * Url to product image.
	 */
	image: string,

	/**
	 * Product category id.
	 */
	category: string,
}

/**
 * Product category type.
 */
type TCategory = TCollectionItem & {
	slug: string
};

/**
 * Order status sets.
 */
enum OrderStatus {
	CREATED = 'created',
	COMPLETED = 'completed',
	ERROR = 'error',
}

enum EventsNames {
	PRODUCTS_CHANGED = 'products:changed',
	PRODUCT_CATEGORY_SET = 'product:category-set',
	PRODUCT_PREVIEW = 'product:preview',
	PRODUCT_PREVIEW_CHANGED = 'preview:changed',
	BASKET_OPEN = 'basket:open',
	BASKET_ADD = 'basket:add',
	BASKET_DELETE = 'basket:delete',
	BASKET_CHANGED = 'basket:changed',
	MODAL_OPEN = 'modal:open',
	MODAL_CLOSE = 'modal:close',
	ORDER_OPEN = 'order:open',
	ORDER_CHANGE = 'order:change',
	CONTACTS_CHANGE = 'contacts:change',
	ORDER_FIELD_CHANGE = 'order:field-change',
	CONTACTS_FIELD_CHANGE = 'contacts:field-change',
	ORDER_SUBMIT = 'order:submit',
	CONTACTS_SUBMIT = 'contacts:submit',
	SUCCESS_CLOSE = 'success:close',
}

/**
 * Base collection interface.
 */
interface ICollection<Type> {
	/**
	 * The items in the collection, where the number is item id and the value is the item.
	 */
	_items: Map<string, Type>;


	/**
	 * Add item to collection.
	 *
	 * @param {Type} item
	 *   The item data.
	 */
	addItem(item: Type): void

	/**
	 * Get items collection.
	 *
	 * @returns {Type[]}
	 */
	getItems(): Type[];

	/**
	 * Get item data by id.
	 *
	 * @param {string} id
	 *   Item id string.
	 * @returns {Type | undefined}ICollection
	 *   The item data.
	 */
	getItem(id: string): Type | undefined;

	/**
	 * Remove item from the basket.
	 *
	 * @param {string} id
	 *   The item id string.
	 */
	removeItem(id: string): void;
}

interface IOrder {
	payment: string,
	email: string,
	phone: string,
	address: string,
	total: number,
	items: string[]
}

interface AppInterface {
	products: ICollection<TProduct>
	categories: ICollection<TCategory>
	basket: string[];
	activeProduct: string | null
	order: Order
}

interface IView {

	/**
	 * Return rendered element.
	 */
	render(): HTMLElement;

	/**
	 * Init view's elements.
	 */
	initElements():void;

	/**
	 * Init view's events.
	 */
	initEvents():void;
}

export {
	EventsNames,
	TCollectionItem,
	TProduct,
	TCategory,
	OrderStatus,
	ICollection,
	IOrder,
	AppInterface,
	IView
}
