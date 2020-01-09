import {object, number, string} from 'yup';
import TSchemas from '../src/index';

const obj = {
	anumber: 5,
	astring: 'hello world',
};

const schema = object({
	anumber: number().required(),
	astring: string().required(),
});

it('should validate', async () => {
	expect.assertions(1);
	expect(await TSchemas.schemaValidate(schema, obj)).toBeNull();
});
it('should fail validation', async () => {
	expect.assertions(1);
	expect(await TSchemas.schemaValidate(schema, {anumber: 'this is not a number'})).toMatchSnapshot();
});
