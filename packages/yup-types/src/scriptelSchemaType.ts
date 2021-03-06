import {object, number, string, date} from 'yup';

export interface ScriptelSchemaType {
	width?: number | null;
	height?: number | null;
	data: string;
	timestamp: Date;
	type?: 'image/svg+xml' | 'image/png' | null;
}

export function scriptelSchemaType() {
	return object()
		.shape({
			width: number().notRequired().nullable(), // by what I understand making it nullable allows null and notRequired allows for undefined
			height: number().notRequired().nullable(),
			data: string().required(),
			timestamp: date().notRequired().nullable(),
			type: string().oneOf(['image/svg+xml', 'image/png']).notRequired().nullable(),
		})
		.required()
		.default(undefined);
}
