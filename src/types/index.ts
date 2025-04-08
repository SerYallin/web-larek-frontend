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
	TCollectionItem,
	TProduct,
	TCategory,
	OrderStatus,
	ICollection,
	IOrder,
	AppInterface,
	IView
}
