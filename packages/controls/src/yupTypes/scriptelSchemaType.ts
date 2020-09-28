import {object, number, string, date} from 'yup';

export function scriptelSchemaType() {
	return object()
		.shape({
			width: number().notRequired(),
			height: number().notRequired(),
			data: string().required(),
			timestamp: date().required(),
			type: string().oneOf(['image/svg+xml', 'image/png']).notRequired(),
		})
		.required()
		.default(undefined);
}
