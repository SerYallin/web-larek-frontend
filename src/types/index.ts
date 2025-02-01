/**
 * Product item type.
 */
type TProduct = {
	/**
	 * Product name.
	 */
	name: string,

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
	category: number,
}

/**
 * Product category type.
 */
type TCategory = {
	/**
	 * Category name.
	 */
	name: string,
}

/**
 * Order status sets.
 */
enum OrderStatus {
	CREATED = 'created',
	PROCESSING = 'processing',
	COMPLETED = 'completed',
	ERROR = 'error',
	CANCELED = 'canceled',
}

/**
 * Base collection interface.
 */
interface ICollection<Type> {
	/**
	 * The items in the collection, where the string is item id and the value is the item.
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

/**
 * Basket collection.
 */
interface IBasketCollection<Type> extends ICollection<Type> {

	/**
	 * The total amount of items in the basket.
	 */
	count: number;

	/**
	 * Total price of items in the basket.
	 */
	totalPrice: number;
}

interface IOrder {

	_payment: string;
	_address: string;
	_email: string;
	_phone: string;
	_status: OrderStatus;
	_errors: string[];
	_basket: IBasketCollection<TProduct>;

	/**
	 * Total price of items in the basket.
	 */
	total: number;

	/**
	 * Update order according to the data.
	 *
	 * @param {object} data
	 *   Order data.
	 */
	update(data: object): void;

	/**
	 * Set new order status.
	 *
	 * @param {OrderStatus} status
	 *   New order status.
	 */
	setStatus(status: OrderStatus): void

	/**
	 * Get order status.
	 *
	 * @returns {string}
	 *   Order status.
	 */
	getStatus(): string;

	/**
	 * Add new order error.
	 *
	 * @param {string} error
	 *   Order error message.
	 */
	addError(error: string): void

	/**
	 * Get order errors.
	 *
	 * @returns {string[]}
	 *   Order errors.
	 */
	getErrors(): string[];
}

interface AppInterface {

	/**
	 * Application product list.
	 */
	products: ICollection<TProduct>;

	/**
	 * Application categories.
	 */
	categories: ICollection<TCategory>;

	/**
	 * Application basket items.
	 */
	basket: IBasketCollection<TProduct>;

	/**
	 * Initial application function.
	 */
	init(): void;
}

interface IView {

	/**
	 * Render view.
	 *
	 * @returns {string}
	 */
	render(): string
}


