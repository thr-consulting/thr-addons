import {
	isPdf,
	isDoc,
	isZip,
	isImage,
	isJpg,
	isXps,
	mimetypeFromFilename,
	extFromMimetype,
} from './mimeCheck';

describe('mimeCheck', () => {
	it('should check pdf', () => {
		expect(isPdf('application/pdf')).toBe(true);
		expect(isPdf('  application/pdf  ')).toBe(true);
		expect(isPdf('image/jpeg')).toBe(false);
	});

	it('should check documents', () => {
		// Legacy Microsoft Office
		expect(isDoc('application/msword')).toBe(true);
		expect(isDoc('application/vnd.ms-excel')).toBe(true);
		expect(isDoc('application/vnd.ms-powerpoint')).toBe(true);

		// OpenXML Microsoft Office
		expect(isDoc('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe(true);
		expect(isDoc('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).toBe(true);
		expect(isDoc('application/vnd.openxmlformats-officedocument.presentationml.presentation')).toBe(true);

		// OpenDocument Format
		expect(isDoc('application/vnd.oasis.opendocument.text')).toBe(true);
		expect(isDoc('application/vnd.oasis.opendocument.graphics')).toBe(true);
		expect(isDoc('application/vnd.oasis.opendocument.spreadsheet')).toBe(true);

		// RTF & Apple iWork
		expect(isDoc('application/rtf')).toBe(true);
		expect(isDoc('text/rtf')).toBe(true);
		expect(isDoc('application/vnd.apple.pages')).toBe(true);
		expect(isDoc('application/vnd.apple.numbers')).toBe(true);
		expect(isDoc('application/vnd.apple.keynote')).toBe(true);

		// Google Workspace
		expect(isDoc('application/vnd.google-apps.document')).toBe(true);
		expect(isDoc('application/vnd.google-apps.spreadsheet')).toBe(true);
		expect(isDoc('application/vnd.google-apps.presentation')).toBe(true);

		// Whitespace and non-doc checks
		expect(isDoc('  application/msword  ')).toBe(true);
		expect(isDoc('image/jpeg')).toBe(false);
	});

	it('should check zips', () => {
		expect(isZip('application/x-zip-compressed')).toBe(true);
		expect(isZip('application/zip')).toBe(true);
		expect(isZip('application/x-zip')).toBe(true);
		expect(isZip('application/zip-compressed')).toBe(true);
		expect(isZip('  application/zip  ')).toBe(true);
		expect(isZip('image/jpeg')).toBe(false);
	});

	it('should check images', () => {
		expect(isImage('image/jpeg')).toBe(true);
		expect(isImage('image/jpg')).toBe(true);
		expect(isImage('image/png')).toBe(true);
		expect(isImage('image/gif')).toBe(true);
		expect(isImage('image/tif')).toBe(true);
		expect(isImage('image/tiff')).toBe(true);
		expect(isImage('image/bmp')).toBe(true);
		expect(isImage('image/avif')).toBe(true);
		expect(isImage('image/heic')).toBe(true);
		expect(isImage('image/heif')).toBe(true);
		expect(isImage('image/webp')).toBe(true);
		expect(isImage('image/svg+xml')).toBe(true);
		expect(isImage('image/apng')).toBe(true);
		expect(isImage('image/*')).toBe(true);
		expect(isImage('  image/webp  ')).toBe(true);
		expect(isImage('application/pdf')).toBe(false);
	});

	it('should check jpg images', () => {
		expect(isJpg('image/jpeg')).toBe(true);
		expect(isJpg('  image/jpeg  ')).toBe(true);
		expect(isJpg('image/jpg')).toBe(false);
		expect(isJpg('image/png')).toBe(false);
	});

	it('should check xps files', () => {
		expect(isXps('application/vnd.ms-xpsdocument')).toBe(true);
		expect(isXps('application/oxps')).toBe(true);
		expect(isXps('  application/oxps  ')).toBe(true);
		expect(isXps('application/pdf')).toBe(false);
	});

	it('should check mimetypes from filenames', () => {
		expect(mimetypeFromFilename('blah.jpg')).toBe('image/jpeg');
		expect(mimetypeFromFilename('blah.doc')).toBe('application/msword');
		expect(mimetypeFromFilename('blah.zip')).toBe('application/zip');
		expect(mimetypeFromFilename('blah.webp')).toBe('image/webp');
	});

	it('should get an extension from a mimetype', () => {
		expect(extFromMimetype('image/jpeg')).toBe('jpeg');
		expect(extFromMimetype('application/zip')).toBe('zip');
		expect(extFromMimetype('application/msword')).toBe('doc');
		expect(extFromMimetype('  image/webp  ')).toBe('webp');
	});
});