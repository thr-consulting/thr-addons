import type {Buffer} from 'node:buffer';
import type {Readable} from 'node:stream';

export type PdfInputType = string | Readable | Buffer | Uint8Array | ArrayBuffer;
