## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#CLEAR_MESSAGES">CLEAR_MESSAGES</a> ⇒ <code>ReduxAction</code></td>
    <td><p>Adds a message banner.</p>
</td>
    </tr>
</tbody>
</table>

## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#clearAllMessages">clearAllMessages(store)</a></td>
    <td><p>Clears all messages if messages exist. Call from route.onChange().</p>
</td>
    </tr>
<tr>
    <td><a href="#addSuccessMessage">addSuccessMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></td>
    <td><p>Adds a success message banner.</p>
</td>
    </tr>
<tr>
    <td><a href="#addErrorMessage">addErrorMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></td>
    <td><p>Adds an error message banner.</p>
</td>
    </tr>
<tr>
    <td><a href="#addWarnMessage">addWarnMessage(message, title, id)</a> ⇒ <code>ReduxAction</code></td>
    <td><p>Adds a warning message banner.</p>
</td>
    </tr>
<tr>
    <td><a href="#clearMessage">clearMessage(id)</a> ⇒ <code>ReduxAction</code></td>
    <td><p>Clears a specific message.</p>
</td>
    </tr>
<tr>
    <td><a href="#clearMessages">clearMessages()</a> ⇒ <code>ReduxAction</code></td>
    <td><p>Clears all messages.</p>
</td>
    </tr>
</tbody>
</table>

<a name="CLEAR_MESSAGES"></a>

## CLEAR_MESSAGES
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | A message level. One of: success, error, warning, info, or a Semantic UI color. |
| message | <code>string</code> | The text message. |
| title | <code>string</code> | The message title. |
| id | <code>string</code> | A unique ID to identify your message. Optional. |

Adds a message banner.


* * *

<a name="clearAllMessages"></a>

## clearAllMessages(store)

| Param | Description |
| --- | --- |
| store | Redux store |

Clears all messages if messages exist. Call from route.onChange().


* * *

<a name="addSuccessMessage"></a>

## addSuccessMessage(message, title, id)
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Success&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;success&quot;</code> | Unique ID. Optional. |

Adds a success message banner.


* * *

<a name="addErrorMessage"></a>

## addErrorMessage(message, title, id)
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Error&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;error&quot;</code> | Unique ID. Optional. |

Adds an error message banner.


* * *

<a name="addWarnMessage"></a>

## addWarnMessage(message, title, id)
**Tag**: Action  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The text message. |
| title | <code>string</code> | <code>&quot;Warning&quot;</code> | The message title. |
| id | <code>string</code> | <code>&quot;warn&quot;</code> | Unique ID. Optional. |

Adds a warning message banner.


* * *

<a name="clearMessage"></a>

## clearMessage(id)
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The unique id of the message to clear. |

Clears a specific message.


* * *

<a name="clearMessages"></a>

## clearMessages()
**Tag**: Action  
Clears all messages.


* * *

