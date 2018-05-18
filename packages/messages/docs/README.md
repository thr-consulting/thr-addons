## Members

<dl>
<dt><a href="#CLEAR_MESSAGES">CLEAR_MESSAGES</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds a message banner.</p>
</dd>
<dt><a href="#CLEAR_MESSAGES">CLEAR_MESSAGES</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds a message banner.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#clearAllMessages">clearAllMessages(store)</a></dt>
<dd><p>Clears all messages if messages exist. Call from route.onChange().</p>
</dd>
<dt><a href="#addSuccessMessage">addSuccessMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds a success message banner.</p>
</dd>
<dt><a href="#addErrorMessage">addErrorMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds an error message banner.</p>
</dd>
<dt><a href="#addWarnMessage">addWarnMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds a warning message banner.</p>
</dd>
<dt><a href="#clearMessage">clearMessage(id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Clears a specific message.</p>
</dd>
<dt><a href="#clearMessages">clearMessages()</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Clears all messages.</p>
</dd>
<dt><a href="#clearAllMessages">clearAllMessages(store)</a></dt>
<dd><p>Clears all messages if messages exist. Call from route.onChange().</p>
</dd>
<dt><a href="#addSuccessMessage">addSuccessMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds a success message banner.</p>
</dd>
<dt><a href="#addErrorMessage">addErrorMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds an error message banner.</p>
</dd>
<dt><a href="#addWarnMessage">addWarnMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Adds a warning message banner.</p>
</dd>
<dt><a href="#clearMessage">clearMessage(id)</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Clears a specific message.</p>
</dd>
<dt><a href="#clearMessages">clearMessages()</a> ⇒ <code>ReduxAction</code></dt>
<dd><p>Clears all messages.</p>
</dd>
</dl>

<a name="CLEAR_MESSAGES"></a>

## CLEAR_MESSAGES ⇒ <code>ReduxAction</code>
Adds a message banner.

**Kind**: global variable  
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | A message level. One of: success, error, warning, info, or a Semantic UI color. |
| message | <code>string</code> | The text message. |
| title | <code>string</code> | The message title. |
| id | <code>string</code> | A unique ID to identify your message. Optional. |

<a name="CLEAR_MESSAGES"></a>

## CLEAR_MESSAGES ⇒ <code>ReduxAction</code>
Adds a message banner.

**Kind**: global variable  
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | A message level. One of: success, error, warning, info, or a Semantic UI color. |
| message | <code>string</code> | The text message. |
| title | <code>string</code> | The message title. |
| id | <code>string</code> | A unique ID to identify your message. Optional. |

<a name="clearAllMessages"></a>

## clearAllMessages(store)
Clears all messages if messages exist. Call from route.onChange().

**Kind**: global function  

| Param | Description |
| --- | --- |
| store | Redux store |

<a name="addSuccessMessage"></a>

## addSuccessMessage(message, title, id) ⇒ <code>ReduxAction</code>
Adds a success message banner.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Success&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;success&quot;</code> | Unique ID. Optional. |

<a name="addErrorMessage"></a>

## addErrorMessage(message, title, id) ⇒ <code>ReduxAction</code>
Adds an error message banner.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Error&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;error&quot;</code> | Unique ID. Optional. |

<a name="addWarnMessage"></a>

## addWarnMessage(message, title, id) ⇒ <code>ReduxAction</code>
Adds a warning message banner.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Warning&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;warn&quot;</code> | Unique ID. Optional. |

<a name="clearMessage"></a>

## clearMessage(id) ⇒ <code>ReduxAction</code>
Clears a specific message.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The unique id of the message to clear. |

<a name="clearMessages"></a>

## clearMessages() ⇒ <code>ReduxAction</code>
Clears all messages.

**Kind**: global function  
**Tag**: Action  
<a name="clearAllMessages"></a>

## clearAllMessages(store)
Clears all messages if messages exist. Call from route.onChange().

**Kind**: global function  

| Param | Description |
| --- | --- |
| store | Redux store |

<a name="addSuccessMessage"></a>

## addSuccessMessage(message, title, id) ⇒ <code>ReduxAction</code>
Adds a success message banner.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Success&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;success&quot;</code> | Unique ID. Optional. |

<a name="addErrorMessage"></a>

## addErrorMessage(message, title, id) ⇒ <code>ReduxAction</code>
Adds an error message banner.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Error&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;error&quot;</code> | Unique ID. Optional. |

<a name="addWarnMessage"></a>

## addWarnMessage(message, title, id) ⇒ <code>ReduxAction</code>
Adds a warning message banner.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Warning&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;warn&quot;</code> | Unique ID. Optional. |

<a name="clearMessage"></a>

## clearMessage(id) ⇒ <code>ReduxAction</code>
Clears a specific message.

**Kind**: global function  
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The unique id of the message to clear. |

<a name="clearMessages"></a>

## clearMessages() ⇒ <code>ReduxAction</code>
Clears all messages.

**Kind**: global function  
**Tag**: Action  
