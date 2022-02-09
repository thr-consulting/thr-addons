declare module 'crc-32' {
	interface Crc32 {
		buf: (buf: Buffer | Uint8Array, seed?: number) => number;
		bstr: (bstr: string, seed?: number) => number;
		str: (str: string, seed?: number) => number;
	}

	const crc32: Crc32;
	export default crc32;
}
