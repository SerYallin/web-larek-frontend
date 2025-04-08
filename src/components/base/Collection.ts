import { ICollection, TCollectionItem } from '../../types';

export class Collection<Type extends TCollectionItem> implements ICollection<Type> {
	_items: Map<string, Type>;

	constructor(list?: Type[]) {
		this._items = new Map<string, Type>();
		if (list) {
			list.forEach((item) => {
				this.addItem(item);
			});
		}
	}

	addItem(item: Type): void {
		this._items.set(item.id, item);
	}

	getItem(id: string): Type | undefined {
		return this._items.get(id);
	}

	getItems(): Type[] {
		return Array.from(this._items.values() ?? []);
	}

	removeItem(id: string) {
		this._items.delete(id);
	}

}