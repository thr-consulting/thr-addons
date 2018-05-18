
## 

* [MomentSchema](#MomentSchema)
* [MoneySchema](#MoneySchema)
* [MomentSchema](#MomentSchema)
* [MoneySchema](#MoneySchema)

## 

* [moment](#moment)
* [localDateNumber](#localDateNumber)
* [email](#email)
* [password](#password)
* [passwordSecond](#passwordSecond)
* [address](#address)
* [phone](#phone)
* [moment](#moment)
* [localDateNumber](#localDateNumber)
* [email](#email)
* [password](#password)
* [passwordSecond](#passwordSecond)
* [address](#address)
* [phone](#phone)

## 

* [schemaValidate(schema, obj, validateOptions)](#schemaValidate) ⇒ <code>object</code>
* [email()](#email)
* [schemaValidate(schema, obj, validateOptions)](#schemaValidate) ⇒ <code>object</code>
* [email()](#email)

## 

* [YupSchema](#YupSchema) : <code>Object</code>
* [YupSchema](#YupSchema) : <code>Object</code>

<a name="MomentSchema"></a>

## MomentSchema
Validates a Moment.

**Kind**: global class  
<a name="MoneySchema"></a>

## MoneySchema
Validates a Money (from js-money).

**Kind**: global class  
<a name="MomentSchema"></a>

## MomentSchema
Validates a Moment.

**Kind**: global class  
<a name="MoneySchema"></a>

## MoneySchema
Validates a Money (from js-money).

**Kind**: global class  
<a name="moment"></a>

## moment
Validates a LocalDateNumber

**Kind**: global variable  
<a name="localDateNumber"></a>

## localDateNumber
Validates a LocalDate

**Kind**: global variable  
<a name="email"></a>

## email
Validates a password. Required string, min length 6 chars.

**Kind**: global variable  
<a name="password"></a>

## password
Validates a second password.

**Kind**: global variable  

| Param |
| --- |
| passwordField | 

<a name="passwordSecond"></a>

## passwordSecond
Validates an address object.

**Kind**: global variable  
<a name="address"></a>

## address
Validates a phone number.

**Kind**: global variable  
<a name="phone"></a>

## phone
Validates a Canadian SIN.

**Kind**: global variable  
<a name="moment"></a>

## moment
Validates a LocalDateNumber

**Kind**: global variable  
<a name="localDateNumber"></a>

## localDateNumber
Validates a LocalDate

**Kind**: global variable  
<a name="email"></a>

## email
Validates a password. Required string, min length 6 chars.

**Kind**: global variable  
<a name="password"></a>

## password
Validates a second password.

**Kind**: global variable  

| Param |
| --- |
| passwordField | 

<a name="passwordSecond"></a>

## passwordSecond
Validates an address object.

**Kind**: global variable  
<a name="address"></a>

## address
Validates a phone number.

**Kind**: global variable  
<a name="phone"></a>

## phone
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

<a name="email"></a>

## email()
Validates email addresses.

**Kind**: global function  
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

<a name="email"></a>

## email()
Validates email addresses.

**Kind**: global function  
<a name="YupSchema"></a>

## YupSchema : <code>Object</code>
Generic Yup Schema

**Kind**: global typedef  
<a name="YupSchema"></a>

## YupSchema : <code>Object</code>
Generic Yup Schema

**Kind**: global typedef  
