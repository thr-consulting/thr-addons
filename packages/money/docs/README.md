## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#MoneyInput">MoneyInput</a></td>
    <td><p>A masked money input. Defaults to CAD funds.</p>
</td>
    </tr>
<tr>
    <td><a href="#MoneyInputMask">MoneyInputMask</a></td>
    <td><p>A masked money input. Defaults to CAD funds.</p>
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
    <td><a href="#getCountryCode">getCountryCode(currency)</a> ⇒ <code>string</code></td>
    <td><p>Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.</p>
</td>
    </tr>
<tr>
    <td><a href="#makeMoney">makeMoney(objOrDecimal, currency)</a> ⇒ <code>Money</code></td>
    <td><p>Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.</p>
</td>
    </tr>
<tr>
    <td><a href="#roundTo">roundTo(value, decimals)</a> ⇒ <code>number</code></td>
    <td><p>Rounds a decimal value to a certain number of decimal digits.</p>
</td>
    </tr>
<tr>
    <td><a href="#formatMoney">formatMoney(money, symbol)</a> ⇒ <code>string</code></td>
    <td><p>Formats a Money value to a nice string.</p>
</td>
    </tr>
<tr>
    <td><a href="#transformObjectsToMoney">transformObjectsToMoney(obj)</a> ⇒ <code>*</code></td>
    <td><p>Transforms anything that has Money style objects into Money.</p>
</td>
    </tr>
</tbody>
</table>

<a name="MoneyInput"></a>

## MoneyInput
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Money</code> |  | The money value. |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| onDetailsClick | <code>function</code> |  | Called when the details button is clicked. |
| [detailsIcon] | <code>string</code> | <code>&quot;server&quot;</code> | The Semantic UI icon to display on the details button. |
| placeholder | <code>string</code> |  | The placeholder text to display. |
| [locked] | <code>bool</code> | <code>false</code> | If true, cannot edit the amount. |

A masked money input. Defaults to CAD funds.


* * *

<a name="MoneyInputMask"></a>

## MoneyInputMask
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Money</code> |  | The money value. |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| onDetailsClick | <code>function</code> |  | Called when the details button is clicked. |
| [detailsIcon] | <code>string</code> | <code>&quot;server&quot;</code> | The Semantic UI icon to display on the details button. |
| placeholder | <code>string</code> |  | The placeholder text to display. |
| [locked] | <code>bool</code> | <code>false</code> | If true, cannot edit the amount. |

A masked money input. Defaults to CAD funds.


* * *

<a name="getCountryCode"></a>

## getCountryCode(currency)

| Param | Type | Description |
| --- | --- | --- |
| currency | <code>string</code> | The currency code. |

Returns a country code from a currency. Not 100% accurate as some currencies are used in multiple countries.

**Returns**: <code>string</code> - The country code.  

* * *

<a name="makeMoney"></a>

## makeMoney(objOrDecimal, currency)

| Param | Type | Description |
| --- | --- | --- |
| objOrDecimal | <code>Object</code> \| <code>number</code> \| <code>string</code> | The object or decimal to convert to Money. |
| currency | <code>string</code> | If converting a decimal, null, or string, specifies the currency to use. |

Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.


* * *

<a name="roundTo"></a>

## roundTo(value, decimals)

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A number to round. |
| decimals | <code>number</code> | The number of decimal digits to round to. |

Rounds a decimal value to a certain number of decimal digits.

**Returns**: <code>number</code> - - The rounded number.  

* * *

<a name="formatMoney"></a>

## formatMoney(money, symbol)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| money | <code>Money</code> |  | The Money value |
| symbol | <code>bool</code> | <code>false</code> | If true displays the proper currency symbol |

Formats a Money value to a nice string.

**Returns**: <code>string</code> - The formatted Money string  

* * *

<a name="transformObjectsToMoney"></a>

## transformObjectsToMoney(obj)

| Param |
| --- |
| obj | 

Transforms anything that has Money style objects into Money.


* * *

