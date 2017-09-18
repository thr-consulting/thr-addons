import TSchemas from '../src/index';

describe('TSchemas.email', () => {
	it('should validate proper emails', async () => {
		expect.assertions(1);
		expect(await TSchemas.email().isValid('test@example.com')).toBe(true);
	});
	it('should reject improper emails', async () => {
		expect.assertions(2);
		expect(await TSchemas.email().isValid('test')).toBe(false);
		expect(await TSchemas.email().isValid('')).toBe(false);
	});
});

describe('TSchemas.password', () => {
	it('should validate short password length', async () => {
		expect.assertions(1);
		const result = await TSchemas.password().isValid('abcd');
		expect(result).toBe(false);
	});
	it('should validate correct password length', async () => {
		expect.assertions(1);
		const result = await TSchemas.password().isValid('abcdef');
		expect(result).toBe(true);
	});
});

describe('TSchemas.address', () => {
	it('should validate a minimum address', async () => {
		expect.assertions(1);
		const result = await TSchemas.address().isValid({
			description: 'My Address',
			address1: '1 Abc Way',
		});
		expect(result).toBe(true);
	});
	it('should validate a full address', async () => {
		expect.assertions(1);
		const result = await TSchemas.address().isValid({
			description: 'My Address',
			address1: '1 Abc Way',
			address2: 'Apt 5',
			city: 'Somewhereville',
			province: 'Manitobastan',
			postalCode: 'R5G 1R2',
		});
		expect(result).toBe(true);
	});
});

describe('TSchemas.phone', () => {
	it('should validate a phone number', async () => {
		expect.assertions(1);
		const result = await TSchemas.phone().isValid({
			description: 'My Number',
			number: '204-555-5555',
		});
		expect(result).toBe(true);
	});
	it('should reject improper phone numbers', async () => {
		expect.assertions(2);
		expect(await TSchemas.phone().isValid('2045')).toBe(false);
		expect(await TSchemas.phone().isValid('')).toBe(false);
	});
});

describe('TSchemas.sin', () => {
	it('should validate a SIN', async () => {
		expect.assertions(1);
		const result = await TSchemas.sin().isValid({
			sin: '379457898',
		});
		expect(result).toBe(true);
	});
	it('should reject improper SIN', async () => {
		expect.assertions(2);
		expect(await TSchemas.phone().isValid('123456789')).toBe(false);
		expect(await TSchemas.phone().isValid('')).toBe(false);
	});
});
