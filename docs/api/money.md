---
sidebar_label: Money
title: Money
---

[![](assets/coverage/money/coverage.svg)](assets/coverage/money/index.html)

Money utils

## Install
```
yarn add @thx/money
```
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

