import {object, number, string} from 'yup';

export function scriptelSchemaType() {
	return object()
		.shape({
			width: number().notRequired(),
			height: number().notRequired(),
			data: string().required(),
			type: string()
				.oneOf(['image/svg+xml', 'image/png'])
				.notRequired(),
		})
		.default(undefined);
}
