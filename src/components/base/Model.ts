import { IEvents } from './events';

export abstract class Model<Type> {

	protected events: IEvents
	constructor(data: Partial<Type>, events: IEvents) {
		Object.assign(this, data);
		this.events = events;
	}

	emitChanges(eventName: string, data?: object) {
		this.events.emit(eventName, data ?? {});
	}
}