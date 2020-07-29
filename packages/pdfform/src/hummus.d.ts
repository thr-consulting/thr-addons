/* eslint-disable max-classes-per-file,import/export */
declare module 'hummus' {
	import {EventEmitter} from 'events';

	export class PDFWriter {
		end(): void;
		getEvents(): EventEmitter;
		triggerDocumentExtensionEvent(eventName: string, eventParams: any): void;
		startPageContentContext(page: number): PDFPageContentContext;
		pausePageContentContext(context: PDFPageContentContext): void;
		getImageDimensions(
			imageFilePath: string,
		): {
			width: number;
			height: number;
		};

		createImageXObjectFromJPG(imageFilePath: string): XObject;
		createFormXObjectFromJPG(imageFilePath: string): XObject;
		createFormXObjectFromPNG(imageFilePath: string): XObject;
	}

	export class PDFWStream {
		write(inBytesArray: number[]): number;
		getCurrentPosition(): number;
	}

	export class PDFWStreamForFile extends PDFWStream {
		constructor(inPath: string);
		close(cb: () => void): void;
	}

	export class PDFWStreamForBuffer extends PDFWStream {
		constructor();
	}

	export class PDFRStream {
		read(inAmount: number): number;
		notEnded(): boolean;
		setPosition(inPosition: number): void;
		setPositionFromEnd(inPosition: number): void;
		skip(inAmount: number): void;
		getCurrentPosition(): number;
	}

	export class PDFRStreamForFile extends PDFRStream {
		constructor(inPath: string);
		close(inCallback: () => void): void;
	}

	export class PDFRStreamForBuffer extends PDFRStream {
		constructor(buffer: Buffer);
	}

	export class PDFPageModifier {
		constructor(pdfWriter: PDFWriter, pageIndex: number, graphicsFlag?: boolean);
		startContext(): PDFPageContentContext;
		endContext(): PDFPageContentContext;
	}

	export enum ImageFit {
		always = 'always',
		overflow = 'overflow',
	}

	export interface ImageOptions {
		index?: number;
		transformation?:
			| number[]
			| {
					width: number;
					height: number;
					proportional?: boolean;
					fit?: ImageFit;
			  };
	}

	export type XObject = Record<string, unknown>;

	export class PDFPageContentContext {
		constructor();
		getContext(): PDFPageContentContext;
		writePage(): void;
		drawImage(x: number, y: number, imageFilePath: string, options?: ImageOptions): void;
		q(): PDFPageContentContext;
		Q(): PDFPageContentContext;
		cm(a: number, b: number, c: number, d: number, e: number, f: number): PDFPageContentContext;
		doXObject(xObject: XObject): PDFPageContentContext;
	}

	export function createWriterToModify(inFilePath: string, inOptionsObject?: Record<string, unknown>): PDFWriter;
	export function createWriterToModify(ifSourceStream: PDFRStream, inTargetStream: PDFWStream, inOptionsObject?: Record<string, unknown>): PDFWriter;
}
