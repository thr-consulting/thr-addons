import mime from 'mime-types';

/**
 * Returns true if the mimetype is a PDF
 * @param {string} mimetype - The mimetype
 * @return {boolean}
 */
export function isPdf(mimetype: string): boolean {
	return mimetype === 'application/pdf';
}

/**
 * Returns true if the mimetype is a document. (doc, docx, odt, ods, xlsx, etc)
 * @param {string} mimetype - The mimetype
 * @return {boolean}
 */
export function isDoc(mimetype: string): boolean {
	switch (mimetype) {
		case 'application/msword':
		case 'application/vnd.ms-excel':
		case 'application/vnd.oasis.opendocument.text':
		case 'application/vnd.oasis.opendocument.graphics':
		case 'application/vnd.oasis.opendocument.spreadsheet':
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
		case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
			return true;
		default:
			return false;
	}
}

/**
 * Returns true if mimetype is a zip file. Does not include 7z, rar, etc.
 * @param {string} mimetype - The mimetype
 * @return {boolean}
 */
export function isZip(mimetype: string): boolean {
	switch (mimetype) {
		case 'application/x-zip-compressed':
		case 'application/zip':
			return true;
		default:
			return false;
	}
}

/**
 * Returns true if the mimetype is an image
 * @param {string} mimetype - The mimetype
 * @return {boolean}
 */
export function isImage(mimetype: string): boolean {
	switch (mimetype) {
		case 'image/jpeg':
		case 'image/jpg': // This is invalid but it is still used sometimes.
		case 'image/png':
		case 'image/gif':
		case 'image/tif':
		case 'image/tiff':
		case 'image/bmp':
		case 'image/avif':
		case 'image/heic':
		case 'image/*': // This is not a valid mimetype, but it is used for images sometimes
			return true;
		default:
			return false;
	}
}

/**
 * Returns true if the mimetype is an actual proper JPEG mimetype
 * @param mimetype
 */
export function isJpg(mimetype: string): boolean {
	return mimetype === 'image/jpeg';
}

export function mimetypeFromFilename(filename: string) {
	return mime.lookup(filename);
}

export function extFromMimetype(mimetype: string) {
	return mime.extension(mimetype);
}
