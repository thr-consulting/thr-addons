## Classes

<dl>
<dt><a href="#MongoLoader">MongoLoader</a></dt>
<dd><p>Extend this class to give DataLoader caching and batching power to your Mongo collection.
When creating loaders on properties, make sure each property is indexed for performance reasons.</p>
</dd>
<dt><a href="#MongoLoader">MongoLoader</a></dt>
<dd><p>Extend this class to give DataLoader caching and batching power to your Mongo collection.
When creating loaders on properties, make sure each property is indexed for performance reasons.</p>
</dd>
</dl>

<a name="MongoLoader"></a>

## MongoLoader
Extend this class to give DataLoader caching and batching power to your Mongo collection.
When creating loaders on properties, make sure each property is indexed for performance reasons.

**Kind**: global class  

* [MongoLoader](#MongoLoader)
    * _instance_
        * [.models](#MongoLoader+models) ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
        * [.models](#MongoLoader+models) ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
    * _static_
        * [.ensureOrder(docs, keys, prop, error)](#MongoLoader.ensureOrder)
        * [.ensureOrder(docs, keys, prop, error)](#MongoLoader.ensureOrder)

<a name="MongoLoader+models"></a>

### mongoLoader.models ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
Returns the contexts models. Shortcut for this.ctx.models.

**Kind**: instance property of [<code>MongoLoader</code>](#MongoLoader)  
<a name="MongoLoader+models"></a>

### mongoLoader.models ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
Returns the contexts models. Shortcut for this.ctx.models.

**Kind**: instance property of [<code>MongoLoader</code>](#MongoLoader)  
<a name="MongoLoader.ensureOrder"></a>

### MongoLoader.ensureOrder(docs, keys, prop, error)
Ensure the order of batch loaded objects
Written by lukejagodzinski: https://github.com/facebook/dataloader/issues/66#issuecomment-386252044

**Kind**: static method of [<code>MongoLoader</code>](#MongoLoader)  

| Param | Description |
| --- | --- |
| docs |  |
| keys |  |
| prop |  |
| error | Function that takes a key and should return an error string |

<a name="MongoLoader.ensureOrder"></a>

### MongoLoader.ensureOrder(docs, keys, prop, error)
Ensure the order of batch loaded objects
Written by lukejagodzinski: https://github.com/facebook/dataloader/issues/66#issuecomment-386252044

**Kind**: static method of [<code>MongoLoader</code>](#MongoLoader)  

| Param | Description |
| --- | --- |
| docs |  |
| keys |  |
| prop |  |
| error | Function that takes a key and should return an error string |

<a name="MongoLoader"></a>

## MongoLoader
Extend this class to give DataLoader caching and batching power to your Mongo collection.
When creating loaders on properties, make sure each property is indexed for performance reasons.

**Kind**: global class  

* [MongoLoader](#MongoLoader)
    * _instance_
        * [.models](#MongoLoader+models) ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
        * [.models](#MongoLoader+models) ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
    * _static_
        * [.ensureOrder(docs, keys, prop, error)](#MongoLoader.ensureOrder)
        * [.ensureOrder(docs, keys, prop, error)](#MongoLoader.ensureOrder)

<a name="MongoLoader+models"></a>

### mongoLoader.models ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
Returns the contexts models. Shortcut for this.ctx.models.

**Kind**: instance property of [<code>MongoLoader</code>](#MongoLoader)  
<a name="MongoLoader+models"></a>

### mongoLoader.models ⇒ <code>Object</code> \| <code>ctx._models</code> \| <code>Object</code>
Returns the contexts models. Shortcut for this.ctx.models.

**Kind**: instance property of [<code>MongoLoader</code>](#MongoLoader)  
<a name="MongoLoader.ensureOrder"></a>

### MongoLoader.ensureOrder(docs, keys, prop, error)
Ensure the order of batch loaded objects
Written by lukejagodzinski: https://github.com/facebook/dataloader/issues/66#issuecomment-386252044

**Kind**: static method of [<code>MongoLoader</code>](#MongoLoader)  

| Param | Description |
| --- | --- |
| docs |  |
| keys |  |
| prop |  |
| error | Function that takes a key and should return an error string |

<a name="MongoLoader.ensureOrder"></a>

### MongoLoader.ensureOrder(docs, keys, prop, error)
Ensure the order of batch loaded objects
Written by lukejagodzinski: https://github.com/facebook/dataloader/issues/66#issuecomment-386252044

**Kind**: static method of [<code>MongoLoader</code>](#MongoLoader)  

| Param | Description |
| --- | --- |
| docs |  |
| keys |  |
| prop |  |
| error | Function that takes a key and should return an error string |

