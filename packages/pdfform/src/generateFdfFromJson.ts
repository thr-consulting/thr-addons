/**
 * Generates fdf Data from Json
 * @param data : Object, the object to convert
 * @returns {Buffer}
 */
export default function generateFdfFromJson(data: {[key: string]: string}): Buffer {
	const header = Buffer.from(`
            %FDF-1.2\n
            ${String.fromCharCode(226) +
							String.fromCharCode(227) +
							String.fromCharCode(207) +
							String.fromCharCode(211)}\n
            1 0 obj\n
            <<\n
            /FDF\n
            <<\n
            /Fields [\n
        `);

	let body = Buffer.from('');

	// eslint-disable-next-line no-restricted-syntax
	for (const prop in data) {
		/* istanbul ignore else  */
		// eslint-disable-next-line no-prototype-builtins
		if (data.hasOwnProperty(prop)) {
			body = Buffer.concat([body, Buffer.from('<<\n/T (')]);
			body = Buffer.concat([body, Buffer.from(prop, 'binary')]);
			body = Buffer.concat([body, Buffer.from(')\n/V(')]);
			body = Buffer.concat([body, Buffer.from(data[prop], 'binary')]);
			body = Buffer.concat([body, Buffer.from(')\n>>\n')]);
		}
	}

	const footer = Buffer.from(`
            ]\n
            >>\n
            >>\n
            endobj \n
            trailer\n
            \n
            <<\n
            /Root 1 0 R\n
            >>\n
            %%EOF\n
        `);

	return Buffer.concat([header, body, footer]);
}
