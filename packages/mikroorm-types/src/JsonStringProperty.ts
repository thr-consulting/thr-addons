import {Type} from '@mikro-orm/core';

// NOTE this property only converts to json string, but leaves it as a string when retrieving it from the DB
// We want it to stay like this!!!
export class JsonStringProperty extends Type<any, string> {
	convertToDatabaseValue(javascriptValue: any) {
		return JSON.stringify(javascriptValue);
	}

	convertToJSValue(databaseValue: string) {
		return databaseValue;
	}

	getColumnType() {
		return 'jsonb';
	}
}
