import sha256 from './index';

describe('sha256', () => {
	it('should generate a sha256 hash', () => {
		expect(sha256('some sort of string')).toBe('f044d74a9d136fdb07961dee5645eddea3636fce3836d6cd8c8b42c71eb7b2c2');
	});
});
