## Classes

<dl>
<dt><a href="#MoneyInput">MoneyInput</a></dt>
<dd></dd>
<dt><a href="#MoneyInput">MoneyInput</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getCountryCode">getCountryCode(currency)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.</p>
</dd>
<dt><a href="#makeMoney">makeMoney(objOrDecimal, currency)</a> ⇒ <code><a href="#Money">Money</a></code></dt>
<dd><p>Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.</p>
</dd>
<dt><a href="#roundTo">roundTo(value, decimals)</a> ⇒ <code>number</code></dt>
<dd><p>Rounds a decimal value to a certain number of decimal digits.</p>
</dd>
<dt><a href="#formatMoney">formatMoney(money, symbol)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a Money value to a nice string.</p>
</dd>
<dt><a href="#transformObjectsToMoney">transformObjectsToMoney(obj)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that has Money style objects into Money.</p>
</dd>
<dt><a href="#getCountryCode">getCountryCode(currency)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.</p>
</dd>
<dt><a href="#makeMoney">makeMoney(objOrDecimal, currency)</a> ⇒ <code><a href="#Money">Money</a></code></dt>
<dd><p>Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.</p>
</dd>
<dt><a href="#roundTo">roundTo(value, decimals)</a> ⇒ <code>number</code></dt>
<dd><p>Rounds a decimal value to a certain number of decimal digits.</p>
</dd>
<dt><a href="#formatMoney">formatMoney(money, symbol)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a Money value to a nice string.</p>
</dd>
<dt><a href="#transformObjectsToMoney">transformObjectsToMoney(obj)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that has Money style objects into Money.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Money">Money</a></dt>
<dd><p>A JS-Money object.</p>
</dd>
<dt><a href="#Money">Money</a></dt>
<dd><p>A JS-Money object.</p>
</dd>
</dl>

<a name="MoneyInput"></a>

## MoneyInput
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | [<code>Money</code>](#Money) |  | The money value. |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| onDetailsClick | <code>function</code> |  | Called when the details button is clicked. |
| detailsIcon | <code>string</code> | <code>&quot;server&quot;</code> | The Semantic UI icon to display on the details button. |
| placeholder | <code>string</code> |  | The placeholder text to display. |
| locked | <code>bool</code> | <code>false</code> | If true, cannot edit the amount. |


* [MoneyInput](#MoneyInput)
    * [new MoneyInput()](#new_MoneyInput_new)
    * [new MoneyInput()](#new_MoneyInput_new)

<a name="new_MoneyInput_new"></a>

### new MoneyInput()
A masked money input. Defaults to CAD funds.

<a name="new_MoneyInput_new"></a>

### new MoneyInput()
A masked money input. Defaults to CAD funds.

<a name="MoneyInput"></a>

## MoneyInput
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | [<code>Money</code>](#Money) |  | The money value. |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| onDetailsClick | <code>function</code> |  | Called when the details button is clicked. |
| detailsIcon | <code>string</code> | <code>&quot;server&quot;</code> | The Semantic UI icon to display on the details button. |
| placeholder | <code>string</code> |  | The placeholder text to display. |
| locked | <code>bool</code> | <code>false</code> | If true, cannot edit the amount. |


* [MoneyInput](#MoneyInput)
    * [new MoneyInput()](#new_MoneyInput_new)
    * [new MoneyInput()](#new_MoneyInput_new)

<a name="new_MoneyInput_new"></a>

### new MoneyInput()
A masked money input. Defaults to CAD funds.

<a name="new_MoneyInput_new"></a>

### new MoneyInput()
A masked money input. Defaults to CAD funds.

<a name="getCountryCode"></a>

## getCountryCode(currency) ⇒ <code>string</code>
Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.

**Kind**: global function  
**Returns**: <code>string</code> - The country code.  

| Param | Type | Description |
| --- | --- | --- |
| currency | <code>string</code> | The currency code. |

<a name="makeMoney"></a>

## makeMoney(objOrDecimal, currency) ⇒ [<code>Money</code>](#Money)
Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| objOrDecimal | <code>Object</code> \| <code>decimal</code> | The object or decimal to convert to Money. |
| currency | <code>string</code> | If converting a decimal, specifies the currency to use. |

<a name="roundTo"></a>

## roundTo(value, decimals) ⇒ <code>number</code>
Rounds a decimal value to a certain number of decimal digits.

**Kind**: global function  
**Returns**: <code>number</code> - - The rounded number.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A number to round. |
| decimals | <code>number</code> | The number of decimal digits to round to. |

<a name="formatMoney"></a>

## formatMoney(money, symbol) ⇒ <code>string</code>
Formats a Money value to a nice string.

**Kind**: global function  
**Returns**: <code>string</code> - The formatted Money string  

| Param | Type | Description |
| --- | --- | --- |
| money | [<code>Money</code>](#Money) | The Money value |
| symbol | <code>bool</code> | If true displays the proper currency symbol |

<a name="transformObjectsToMoney"></a>

## transformObjectsToMoney(obj) ⇒ <code>\*</code>
Transforms anything that has Money style objects into Money.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="getCountryCode"></a>

## getCountryCode(currency) ⇒ <code>string</code>
Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.

**Kind**: global function  
**Returns**: <code>string</code> - The country code.  

| Param | Type | Description |
| --- | --- | --- |
| currency | <code>string</code> | The currency code. |

<a name="makeMoney"></a>

## makeMoney(objOrDecimal, currency) ⇒ [<code>Money</code>](#Money)
Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| objOrDecimal | <code>Object</code> \| <code>decimal</code> | The object or decimal to convert to Money. |
| currency | <code>string</code> | If converting a decimal, specifies the currency to use. |

<a name="roundTo"></a>

## roundTo(value, decimals) ⇒ <code>number</code>
Rounds a decimal value to a certain number of decimal digits.

**Kind**: global function  
**Returns**: <code>number</code> - - The rounded number.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A number to round. |
| decimals | <code>number</code> | The number of decimal digits to round to. |

<a name="formatMoney"></a>

## formatMoney(money, symbol) ⇒ <code>string</code>
Formats a Money value to a nice string.

**Kind**: global function  
**Returns**: <code>string</code> - The formatted Money string  

| Param | Type | Description |
| --- | --- | --- |
| money | [<code>Money</code>](#Money) | The Money value |
| symbol | <code>bool</code> | If true displays the proper currency symbol |

<a name="transformObjectsToMoney"></a>

## transformObjectsToMoney(obj) ⇒ <code>\*</code>
Transforms anything that has Money style objects into Money.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="Money"></a>

## Money
A JS-Money object.

**Kind**: global typedef  
<a name="Money"></a>

## Money
A JS-Money object.

**Kind**: global typedef  
