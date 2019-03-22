---
sidebar_label: Mongoloader
title: Mongoloader
---

[![](assets/coverage/mongoloader/coverage.svg)](assets/coverage/mongoloader/index.html)

MongoLoader is a class that uses Facebook's DataLoader to access Mongo. Supports batching and caching.

## Install
```
yarn add @thx/mongoloader
```
<a name="MongoLoader"></a>

## MongoLoader
Extend this class to give DataLoader caching and batching power to your Mongo collection.
When creating loaders on properties, make sure each property is indexed for performance reasons.


* [MongoLoader](#MongoLoader)

    * _instance_
        * [.models](#MongoLoader+models)

    * _static_
        * [.ensureOrder(docs, keys, prop, error)](#MongoLoader.ensureOrder)



* * *

<a name="MongoLoader+models"></a>

### *mongoLoader*.models
Returns the contexts models. Shortcut for this.ctx.models.


* * *

<a name="MongoLoader.ensureOrder"></a>

### *MongoLoader*.ensureOrder(docs, keys, prop, error)

| Param | Description |
| --- | --- |
| docs |  |
| keys |  |
| prop |  |
| error | Function that takes a key and should return an error string |

Ensure the order of batch loaded objects
Written by lukejagodzinski: https://github.com/facebook/dataloader/issues/66#issuecomment-386252044


* * *

