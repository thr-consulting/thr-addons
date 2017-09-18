
## Members

* [MomentSchema](#MomentSchema)
* [localDateNumber](#localDateNumber)
* [LocalDateSchema](#LocalDateSchema)
* [MoneySchema](#MoneySchema)
* [email](#email)
* [password](#password)
* [passwordSecond](#passwordSecond)
* [address](#address)
* [phone](#phone)
* [sin](#sin)
* [MomentSchema](#MomentSchema)
* [localDateNumber](#localDateNumber)
* [LocalDateSchema](#LocalDateSchema)
* [MoneySchema](#MoneySchema)
* [email](#email)
* [password](#password)
* [passwordSecond](#passwordSecond)
* [address](#address)
* [phone](#phone)
* [sin](#sin)

## Functions

* [schemaValidate(schema, obj, validateOptions)](#schemaValidate) ⇒ <code>object</code>
* [schemaValidate(schema, obj, validateOptions)](#schemaValidate) ⇒ <code>object</code>

## Typedefs

* [YupSchema](#YupSchema) : <code>Object</code>
* [YupSchema](#YupSchema) : <code>Object</code>

<a name="MomentSchema"></a>

## MomentSchema
Validates a Moment.

**Kind**: global variable  
<a name="localDateNumber"></a>

## localDateNumber
Validates a LocalDateNumber

**Kind**: global variable  
<a name="LocalDateSchema"></a>

## LocalDateSchema
Validates a LocalDate

**Kind**: global variable  
<a name="MoneySchema"></a>

## MoneySchema
Validates a Money (from js-money).

**Kind**: global variable  
<a name="email"></a>

## email
Validates email addresses.

**Kind**: global variable  
<a name="password"></a>

## password
Validates a password. Required string, min length 6 chars.

**Kind**: global variable  
<a name="passwordSecond"></a>

## passwordSecond
Validates a second password.

**Kind**: global variable  

| Param |
| --- |
| passwordField | 

<a name="address"></a>

## address
Validates an address object.

**Kind**: global variable  
<a name="phone"></a>

## phone
Validates a phone number.

**Kind**: global variable  
<a name="sin"></a>

## sin
Validates a Canadian SIN.

**Kind**: global variable  
<a name="MomentSchema"></a>

## MomentSchema
Validates a Moment.

**Kind**: global variable  
<a name="localDateNumber"></a>

## localDateNumber
Validates a LocalDateNumber

**Kind**: global variable  
<a name="LocalDateSchema"></a>

## LocalDateSchema
Validates a LocalDate

**Kind**: global variable  
<a name="MoneySchema"></a>

## MoneySchema
Validates a Money (from js-money).

**Kind**: global variable  
<a name="email"></a>

## email
Validates email addresses.

**Kind**: global variable  
<a name="password"></a>

## password
Validates a password. Required string, min length 6 chars.

**Kind**: global variable  
<a name="passwordSecond"></a>

## passwordSecond
Validates a second password.

**Kind**: global variable  

| Param |
| --- |
| passwordField | 

<a name="address"></a>

## address
Validates an address object.

**Kind**: global variable  
<a name="phone"></a>

## phone
Validates a phone number.

**Kind**: global variable  
<a name="sin"></a>

## sin
Validates a Canadian SIN.

**Kind**: global variable  
<a name="schemaValidate"></a>

## schemaValidate(schema, obj, validateOptions) ⇒ <code>object</code>
Validates a schema on the server. This function is for use on the server only!
Returns null if validation passed. Returns a yup ValidationError if it fails.
Does not include the object as 'value'.

**Kind**: global function  
**Tag**: Server  

| Param | Type | Description |
| --- | --- | --- |
| schema | [<code>YupSchema</code>](#YupSchema) | The schema to validate against. |
| obj | <code>object</code> | The object to validate. |
| validateOptions |  | Custom yup validate options. |

<a name="schemaValidate"></a>

## schemaValidate(schema, obj, validateOptions) ⇒ <code>object</code>
Validates a schema on the server. This function is for use on the server only!
Returns null if validation passed. Returns a yup ValidationError if it fails.
Does not include the object as 'value'.

**Kind**: global function  
**Tag**: Server  

| Param | Type | Description |
| --- | --- | --- |
| schema | [<code>YupSchema</code>](#YupSchema) | The schema to validate against. |
| obj | <code>object</code> | The object to validate. |
| validateOptions |  | Custom yup validate options. |

<a name="YupSchema"></a>

## YupSchema : <code>Object</code>
Generic Yup Schema

**Kind**: global typedef  
<a name="YupSchema"></a>

## YupSchema : <code>Object</code>
Generic Yup Schema

**Kind**: global typedef  
