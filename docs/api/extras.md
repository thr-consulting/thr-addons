---
sidebar_label: Extras
title: Extras
---

[![](assets/coverage/extras/coverage.svg)](assets/coverage/extras/index.html)

Extra utilities

## Install
```
yarn add @thx/extras
```
<a name="FileCleaner"></a>

## FileCleaner
Class that records written files and cleans up after


* [FileCleaner](#FileCleaner)

    * [.add(filename)](#FileCleaner+add)

    * [.remove(filename)](#FileCleaner+remove)

    * [.rename(a, b)](#FileCleaner+rename)

    * [.removeFiles()](#FileCleaner+removeFiles)

    * [.reset()](#FileCleaner+reset)



* * *

<a name="FileCleaner+add"></a>

### *fileCleaner*.add(filename)

| Param |
| --- |
| filename | 

Adds a file to be cleaned


* * *

<a name="FileCleaner+remove"></a>

### *fileCleaner*.remove(filename)

| Param |
| --- |
| filename | 

Removes a file to be cleaned


* * *

<a name="FileCleaner+rename"></a>

### *fileCleaner*.rename(a, b)

| Param |
| --- |
| a | 
| b | 

Renames a file


* * *

<a name="FileCleaner+removeFiles"></a>

### *fileCleaner*.removeFiles()
Removes files, first checking to make sure they exist


* * *

<a name="FileCleaner+reset"></a>

### *fileCleaner*.reset()
Resets the file cleaner


* * *

<a name="FileTypeReadStream"></a>

## FileTypeReadStream
Determines the mimetype of a stream. Grabs the minimum number of bytes required to determine
the mimetype.


* * *

<a name="SharedCache"></a>

## SharedCache

* [SharedCache](#SharedCache)

    * [new SharedCache(redis, prefix, expire)](#new_SharedCache_new)

    * [.set(key, data, expire)](#SharedCache+set)

    * [.get(key)](#SharedCache+get)

    * [.exists(key)](#SharedCache+exists)

    * [.clear(key)](#SharedCache+clear)



* * *

<a name="new_SharedCache_new"></a>

### new SharedCache(redis, prefix, expire)

| Param |
| --- |
| redis | 
| prefix | 
| expire | 

Constructs a new SharedCache


* * *

<a name="SharedCache+set"></a>

### *sharedCache*.set(key, data, expire)

| Param |
| --- |
| key | 
| data | 
| expire | 

Sets a key value pair with optional expiry (in seconds).


* * *

<a name="SharedCache+get"></a>

### *sharedCache*.get(key)

| Param |
| --- |
| key | 

Gets the value of a key. Returns null if the key does not exist.

**Returns**: <code>Promise.&lt;\*&gt;</code> - The value or null.  

* * *

<a name="SharedCache+exists"></a>

### *sharedCache*.exists(key)

| Param |
| --- |
| key | 

Checks if the key exists in the store.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - Returns true if the key is found, otherwise false.  

* * *

<a name="SharedCache+clear"></a>

### *sharedCache*.clear(key)

| Param |
| --- |
| key | 

Removes a key from the store

**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if they key exists and is cleared, otherwise false  

* * *

<a name="TimeoutCounter"></a>

## TimeoutCounter

* [TimeoutCounter](#TimeoutCounter)

    * [new TimeoutCounter(timeout)](#new_TimeoutCounter_new)

    * [.add()](#TimeoutCounter+add)

    * [.remove()](#TimeoutCounter+remove)

    * [.cancel()](#TimeoutCounter+cancel)



* * *

<a name="new_TimeoutCounter_new"></a>

### new TimeoutCounter(timeout)

| Param | Default |
| --- | --- |
| timeout | <code>1000</code> | 

Initialize a TimeoutCounter with ms delay.


* * *

<a name="TimeoutCounter+add"></a>

### *timeoutCounter*.add()
Increase the counter by one. This also resets the timer.


* * *

<a name="TimeoutCounter+remove"></a>

### *timeoutCounter*.remove()
Decrease the counter by one. This also resets the timer. When the last
item is removed, it fires the 'finish' event.


* * *

<a name="TimeoutCounter+cancel"></a>

### *timeoutCounter*.cancel()
Cancel the timeout counter and reset it.


* * *

<a name="ZipReader"></a>

## ZipReader

* * *

<a name="new_ZipReader_new"></a>

### new ZipReader(fs, filename)

| Param |
| --- |
| fs | 
| filename | 

Used to read zip files from any FS like system.


* * *

<a name="isPdf"></a>

## isPdf(mimetype)

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype |

Returns true if the mimetype is a PDF


* * *

<a name="isDoc"></a>

## isDoc(mimetype)

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype |

Returns true if the mimetype is a document. (doc, docx, odt, ods, xlsx, etc)


* * *

<a name="isZip"></a>

## isZip(mimetype)

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype |

Returns true if mimetype is a zip file. Does not include 7z, rar, etc.


* * *

<a name="isImage"></a>

## isImage(mimetype)

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype |

Returns true if the mimetype is an image


* * *

<a name="isMimetypeSupported"></a>

## isMimetypeSupported(mimetype)

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype |

Returns true if we support the mimetype


* * *

<a name="readFile"></a>

## readFile(thePath)

| Param |
| --- |
| thePath | 

Promise version of readFile


* * *

<a name="writeFile"></a>

## writeFile(thePath, theBuffer)

| Param |
| --- |
| thePath | 
| theBuffer | 

Promise version of writeFile


* * *

<a name="copyFile"></a>

## copyFile(from, to)

| Param |
| --- |
| from | 
| to | 

Copies a source file to a destination.


* * *

<a name="mkdirp"></a>

## mkdirp(thepath)

| Param |
| --- |
| thepath | 

Creates a directory path


* * *

<a name="fileExists"></a>

## fileExists(thePath)

| Param | Type |
| --- | --- |
| thePath | <code>string</code> | 

Checks if a file exists


* * *

<a name="rmFile"></a>

## rmFile(thePath)

| Param |
| --- |
| thePath | 

Promise version of unlink


* * *

<a name="rmFiles"></a>

## rmFiles(files)

| Param |
| --- |
| files | 

Removes multiple files


* * *

<a name="writeStream"></a>

## writeStream(fname, iStream)

| Param |
| --- |
| fname | 
| iStream | 

Promise version of file writer that writes a stream


* * *

<a name="streamToTmp"></a>

## streamToTmp(iStream, tmpFolder)

| Param |
| --- |
| iStream | 
| tmpFolder | 

Streams to a random filename in a tmp folder


* * *

<a name="streamsToTmpFiles"></a>

## streamsToTmpFiles(iStreams, tmpFolder)

| Param |
| --- |
| iStreams | 
| tmpFolder | 

Streams multiple streams to tmp files


* * *

<a name="unzipper"></a>

## unzipper(zipReadStream, onFile)

| Param | Type | Description |
| --- | --- | --- |
| zipReadStream | <code>Readable</code> | The readable zip file stream. |
| onFile | <code>OnFileCallback</code> | Called for each file in the zip file. |

Unzips a zip file calling a callback for each file in the zip file.

**Returns**: <code>Promise.&lt;void&gt;</code> - Returns a promise when the zip file is complete.  

* * *

