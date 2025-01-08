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
	 * @returns {Type}
	 *   The item data.
	 */
	getItem(id: string): Type;

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
interface BasketCollection<Type> extends ICollection<Type> {

	/**
	 * The total amount of items in the basket.
	 */
	count: number;

	/**
	 * Total price of items in the basket.
	 */
	totalPrice: number;
}

interface IOrder extends ICollection<TProduct> {

	_payment: string;
	_address: string;
	_email: string;
	_phone: string;
	_status: string;

	/**
	 * Total price of items in the basket.
	 */
	total: number;

	/**
	 * Get order status.
	 */
	getStatus(): string;
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
	basket: BasketCollection<TProduct>;

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


