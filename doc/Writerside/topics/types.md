# Ключевые типы данных:

## Тип `TProduct`
Данный тип предназначен для хранения данных о продукте. Данный тип используется в таких моделях как список продуктов(`ProductList`), корзина(`Basket`) и заказ(`Order`).
Данный тип включает такие поля как: имя продукта(`name`), цена(`price`), описание(`description`), картинка(`image`), категория(`category`).

```ts
type TProduct = {
	name: string,
	price: number,
	description: string,
	image: string,
	category: number,
}
```

## Тип `TCategory`
Данный тип предназначен для хранения данных о категории продукта. Данный тип используется в таких моделях как список продуктов(`ProductList`), корзина(`Basket`) и заказ(`Order`) для отображения категории продукта.

```ts
type TCategory = {
	name: string,
}
```

## Интерфейс `ICollection`

Данный интерфейс используется для хранения списков продуктов, корзины и заказа. Он описывает такие методы как добавление элемента в список, получение по идентификатору, получение всех элементов и удаление элемента по идентификатору.

```ts
interface ICollection<Type> {
	_items: Map<string, Type>;
	addItem(item: Type): void
	getItems(): Type[];
	getItem(id: string): Type;
	removeItem(id: string): void;
}
```

## Интерфейс `BasketCollection`

Данный интерфейс используется для хранения заказа. Является дочерним от интерфейса `ICollection` и имеет дополнительные поля для хранения количества продуктов и общую стоимость.

```ts
interface BasketCollection<Type> extends ICollection<Type> {
	count: number;
	totalPrice: number;
}
```

## Интерфейс `ICollection`

Данный интерфейс используется для хранения списков корзины. Является дочерним от интерфейса `ICollection` и имеет дополнительные поля для хранения количества продуктов и данных заказа(оплата, адрес, почта, телефон, статус), а также метода получения статуса.

```ts
interface IOrder extends ICollection<TProduct> {

	_payment: string;
	_address: string;
	_email: string;
	_phone: string;
	_status: string;
	total: number;
	
	getStatus(): string;
}
```

## Интерфейс `AppInterface`

Данный интерфейс используется для хранения данных о продуктах, категориях, корзине и метода инициализации.

```ts
interface AppInterface {
	products: ICollection<TProduct>;
	categories: ICollection<TCategory>;
	basket: BasketCollection<TProduct>;
	init(): void;
}
```

## Интерфейс `IView`

Данный интерфейс используется для отображения данных. Он описывает метод `render`, который возвращает строку с HTML строкой блока.

```ts
interface IView {
	render(): string
}
```



