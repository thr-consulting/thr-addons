import {object, number, string} from 'yup';

export function scriptelSchemaType() {
	return object().shape({
		width: number(),
		height: number(),
		data: string().required(),
		type: string().matches(/(image\/svg\+xml|image\/png)/),
	});
}
