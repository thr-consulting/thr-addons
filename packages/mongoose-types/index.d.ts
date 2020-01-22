declare module 'mongoose' {
	import mongoose from 'mongoose';

	namespace Schema {
		namespace Types {
			export class LocalDate extends mongoose.SchemaType {}
			export class Money extends mongoose.SchemaType {}
		}
	}
}
