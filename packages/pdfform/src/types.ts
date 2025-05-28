import type {Buffer} from 'node:buffer';
import type {Readable} from 'node:stream';

export type PdfInputType = string | Readable | Buffer | Uint8Array | ArrayBuffer;

export interface SignatureSchemaType {
	width?: number | null;
	height?: number | null;
	data: string;
	timestamp: Date;
	type?: 'image/svg+xml' | 'image/png' | null;
}
