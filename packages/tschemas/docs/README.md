## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#MomentSchema">MomentSchema</a></td>
    <td><p>Validates a Moment.</p>
</td>
    </tr>
<tr>
    <td><a href="#MoneySchema">MoneySchema</a></td>
    <td><p>Validates a Money (from js-money).</p>
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
    <td><a href="#moment">moment</a></td>
    <td><p>Validates a LocalDateNumber</p>
</td>
    </tr>
<tr>
    <td><a href="#localDateNumber">localDateNumber</a></td>
    <td><p>Validates a LocalDate</p>
</td>
    </tr>
<tr>
    <td><a href="#email">email</a></td>
    <td><p>Validates a password. Required string, min length 6 chars.</p>
</td>
    </tr>
<tr>
    <td><a href="#password">password</a></td>
    <td><p>Validates a second password.</p>
</td>
    </tr>
<tr>
    <td><a href="#passwordSecond">passwordSecond</a></td>
    <td><p>Validates an address object.</p>
</td>
    </tr>
<tr>
    <td><a href="#address">address</a></td>
    <td><p>Validates a phone number.</p>
</td>
    </tr>
<tr>
    <td><a href="#phone">phone</a></td>
    <td><p>Validates a Canadian SIN.</p>
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
    <td><a href="#schemaValidate">schemaValidate(schema, obj, validateOptions)</a> ⇒ <code>object</code></td>
    <td><p>Validates a schema on the server. This function is for use on the server only!
Returns null if validation passed. Returns a yup ValidationError if it fails.
Does not include the object as &#39;value&#39;.</p>
</td>
    </tr>
<tr>
    <td><a href="#email">email()</a></td>
    <td><p>Validates email addresses.</p>
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
    <td><a href="#YupSchema">YupSchema</a> : <code>Object</code></td>
    <td><p>Generic Yup Schema</p>
</td>
    </tr>
</tbody>
</table>

<a name="MomentSchema"></a>

## MomentSchema
Validates a Moment.


* * *

<a name="MoneySchema"></a>

## MoneySchema
Validates a Money (from js-money).


* * *

<a name="moment"></a>

## moment
Validates a LocalDateNumber


* * *

<a name="localDateNumber"></a>

## localDateNumber
Validates a LocalDate


* * *

<a name="email"></a>

## email
Validates a password. Required string, min length 6 chars.


* * *

<a name="password"></a>

## password

| Param |
| --- |
| passwordField | 

Validates a second password.


* * *

<a name="passwordSecond"></a>

## passwordSecond
Validates an address object.


* * *

<a name="address"></a>

## address
Validates a phone number.


* * *

<a name="phone"></a>

## phone
Validates a Canadian SIN.


* * *

<a name="schemaValidate"></a>

## schemaValidate(schema, obj, validateOptions)
**Tag**: Server  

| Param | Type | Description |
| --- | --- | --- |
| schema | [<code>YupSchema</code>](#YupSchema) | The schema to validate against. |
| obj | <code>object</code> | The object to validate. |
| validateOptions |  | Custom yup validate options. |

Validates a schema on the server. This function is for use on the server only!
Returns null if validation passed. Returns a yup ValidationError if it fails.
Does not include the object as 'value'.


* * *

<a name="email"></a>

## email()
Validates email addresses.


* * *

<a name="YupSchema"></a>

## YupSchema
Generic Yup Schema


* * *

