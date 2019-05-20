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
<a name="SharedCache"></a>

## SharedCache

* [SharedCache](#SharedCache)

    * [new SharedCache(prefix, expire)](#new_SharedCache_new)

    * [.set(key, data, expire)](#SharedCache+set)

    * [.get(key)](#SharedCache+get)

    * [.exists(key)](#SharedCache+exists)

    * [.clear(key)](#SharedCache+clear)

    * [.clearAll()](#SharedCache+clearAll)



* * *

<a name="new_SharedCache_new"></a>

### new SharedCache(prefix, expire)

| Param |
| --- |
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

<a name="SharedCache+clearAll"></a>

### *sharedCache*.clearAll()
Clears all keys from the current prefix.


* * *

