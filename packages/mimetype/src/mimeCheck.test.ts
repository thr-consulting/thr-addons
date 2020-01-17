import {isPdf, isDoc, isZip, isImage, isJpg, mimetypeFromFilename, extFromMimetype} from './mimeCheck';

describe('mimeCheck', () => {
	it('should check pdf', () => {
		expect(isPdf('application/pdf')).toBe(true);
		expect(isPdf('image/jpeg')).toBe(false);
	});

	it('should check documents', () => {
		expect(isDoc('application/msword')).toBe(true);
		expect(isDoc('application/vnd.ms-excel')).toBe(true);
		expect(isDoc('application/vnd.oasis.opendocument.text')).toBe(true);
		expect(isDoc('application/vnd.oasis.opendocument.graphics')).toBe(true);
		expect(isDoc('application/vnd.oasis.opendocument.spreadsheet')).toBe(true);
		expect(isDoc('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe(true);
		expect(isDoc('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).toBe(true);
		expect(isDoc('image/jpeg')).toBe(false);
	});

	it('should check zips', () => {
		expect(isZip('application/x-zip-compressed')).toBe(true);
		expect(isZip('application/zip')).toBe(true);
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
		expect(isImage('image/*')).toBe(true);
		expect(isImage('application/pdf')).toBe(false);
	});

	it('should check jpg images', () => {
		expect(isJpg('image/jpeg')).toBe(true);
		expect(isJpg('image/jpg')).toBe(false);
		expect(isJpg('image/png')).toBe(false);
	});

	it('should check mimetypes from filenames', () => {
		expect(mimetypeFromFilename('blah.jpg')).toBe('image/jpeg');
		expect(mimetypeFromFilename('blah.doc')).toBe('application/msword');
		expect(mimetypeFromFilename('blah.zip')).toBe('application/zip');
	});

	it('should get an extension from a mimetype', () => {
		expect(extFromMimetype('image/jpeg')).toBe('jpeg');
		expect(extFromMimetype('application/zip')).toBe('zip');
		expect(extFromMimetype('application/msword')).toBe('doc');
	});
});
