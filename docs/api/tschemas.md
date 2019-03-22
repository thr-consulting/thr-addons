---
sidebar_label: TSchemas
title: TSchemas
---

[![](assets/coverage/tschemas/coverage.svg)](assets/coverage/tschemas/index.html)

Useful yup schema shortcuts

## Install
```bash
yarn add @thx/tschemas
```

## Usage

```js
import {shape} from 'yup';
import {localDate} from '@thx/tschemas';

const schema = shape({
  myDate: localDate().required(),
});
```
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

