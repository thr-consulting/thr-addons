---
sidebar_label: Controls
title: Controls
---

[![](assets/coverage/controls/coverage.svg)](assets/coverage/controls/index.html)

A collection of form components designed with Semantic UI. They all adhere to the policy of having a value prop and an onChange() prop.

## Install
```
yarn add @thx/controls
```

## Usage
```js
import {DatePicker} from '@thx/controls';
import '@thx/controls/lib/controls.css';
```

## Storybook

You can view these components in action in [Storybook](assets/storybook/controls/frame.html).
<a name="DatePickerLocalDate"></a>

## DatePickerLocalDate
**Properties**

| Name | Type |
| --- | --- |
| value | <code>LocalDate</code> \| <code>number</code> | 
| onChange |  | 

Let's you pick a LocalDate. No time parts are recorded.


* * *

<a name="LocalMonthSelect"></a>

## LocalMonthSelect
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| value | <code>Date</code> |  | The value in date form. Day is ignored. |
| [year] | <code>number</code> | <code>Current Year</code> | The year to use when selecting a date. |

Month select dropdown


* * *

<a name="MonthDayDropdown"></a>

## MonthDayDropdown

* * *

<a name="new_MonthDayDropdown_new"></a>

### new MonthDayDropdown(props)

| Param |
| --- |
| props | 


* * *

<a name="MonthYearDropdown"></a>

## MonthYearDropdown

* * *

<a name="new_MonthYearDropdown_new"></a>

### new MonthYearDropdown(props)

| Param |
| --- |
| props | 

MonthYearDropdown


* * *

<a name="TimeDropdown"></a>

## TimeDropdown

* * *

<a name="new_TimeDropdown_new"></a>

### new TimeDropdown(props:)

| Param | Description |
| --- | --- |
| props: | Props |

TimeDropdown


* * *

<a name="AddDynamicFormInput"></a>

## AddDynamicFormInput

* * *

<a name="new_AddDynamicFormInput_new"></a>

### new AddDynamicFormInput(props)

| Param |
| --- |
| props | 

Takes Form.Input as children


* * *

<a name="MaskedInput"></a>

## MaskedInput
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>string</code> \| <code>number</code> | <code>null</code> | The value to display |
| [onChange] | <code>onChange</code> | <code></code> | Called when the value changes. |
| [mask] | [<code>inputmaskPropTypes</code>](#inputmaskPropTypes) | <code></code> | The mask object specified at [here](https://github.com/RobinHerbots/jquery.inputmask). |
|  | <code>type</code> |  | The type of the value that will be returned. |

Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
hundreds of these on one screen at the same time.


* * *

<a name="RadioGroup"></a>

## RadioGroup
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>Array.&lt;Component&gt;</code> | Radio or Form.Radio components |
| onChange | <code>onChange</code> | Standard onChange handler |
| value | <code>bool</code> \| <code>number</code> \| <code>string</code> \| <code>Object</code> | The currently selected radio item |

Groups React Semantic UI Radio elements into a single group


* * *

<a name="_default"></a>

## _default
Manages a connection to the Scriptel Omniscript server.


* [_default](#_default)

    * [.serverConnected(msg, socket)](#_default+serverConnected)

    * [.deviceConnected(socket)](#_default+deviceConnected)



* * *

<a name="_default+serverConnected"></a>

### *_default*.serverConnected(msg, socket)

| Param |
| --- |
| msg | 
| socket | 

Called when connected to the server.


* * *

<a name="_default+deviceConnected"></a>

### *_default*.deviceConnected(socket)

| Param |
| --- |
| socket | 

Called when connected to the device.


* * *

<a name="ScriptelInput"></a>

## ScriptelInput
A signature enter and display control.


* [ScriptelInput](#ScriptelInput)

    * [.renderSignature()](#ScriptelInput+renderSignature)

    * [.renderEntering()](#ScriptelInput+renderEntering)

    * [.renderBlank()](#ScriptelInput+renderBlank)



* * *

<a name="ScriptelInput+renderSignature"></a>

### *scriptelInput*.renderSignature()
Renders the signature image and a clear button.


* * *

<a name="ScriptelInput+renderEntering"></a>

### *scriptelInput*.renderEntering()
Renders a cancel button.


* * *

<a name="ScriptelInput+renderBlank"></a>

### *scriptelInput*.renderBlank()
Renders an enter button.


* * *

<a name="SinEntry"></a>

## SinEntry
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | Just the boolean value if a SIN exists or not |
| onChange | <code>function</code> | Only returns boolean if the SIN is entered properly or not |
| onSinChange | <code>function</code> |  |
| onBlur | <code>function</code> |  |

A SIN entry control. The main value is a boolean to show whether the SIN has been entered or not. This way the actual information doesn't pass into the client.
The onSinChange() prop will be called with the actual SIN text which can be sent to the server separately.


* * *

<a name="ResponsiveMenu"></a>

## ResponsiveMenu
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mobileWidth | <code>number</code> | The number of pixels defining mobile cutoff |
| children | <code>Array.&lt;Component&gt;</code> | ResponsiveMenu.Item or ResponsiveMenu.Dropdown |


* * *

<a name="new_ResponsiveMenu_new"></a>

### new ResponsiveMenu()
Displays a mobile responsive menu


* * *

<a name="MoneyInput"></a>

## MoneyInput
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Money</code> |  | The money value. |
| [currency] | <code>string</code> | <code>&quot;CAD&quot;</code> | The currency if the value is set to null. |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| onDetailsClick | <code>function</code> |  | Called when the details button is clicked. |
| [detailsIcon] | <code>string</code> | <code>&quot;server&quot;</code> | The Semantic UI icon to display on the details button. |
| [locked] | <code>bool</code> | <code>false</code> | If true, cannot edit the amount. |
| onBlur | <code>function</code> |  | Called when the focus is lost. |
| [wholenumber] | <code>bool</code> | <code>false</code> | If true, Then decimals will be zero. |

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

<a name="TForm"></a>

## TForm()
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| render | <code>function</code> | Render prop just like Formik's with additional arguments passed |
| numFields | <code>number</code> | The number of fields in the form. TForm can't automatically get this number. |
| loading | <code>boolean</code> | Passes the loading state through to the child component. |
| errors |  | Used to pass in any GraphQL errors. |
| onSubmit | <code>function</code> | Called when the form submits. |
| getSubmitFn | <code>function</code> | Called when the TForm is mounted so you can get access to the submitForm function. |

Extends Formik to provide Semantic UI error and warning messages and field errors.


* * *

<a name="withScriptel"></a>

## withScriptel(WrappedComponent)

| Param |
| --- |
| WrappedComponent | 

A HoC that provides a connection to a Scriptel Omniscript device.
You can only have a single connection open at a time.


* * *

<a name="inputmaskPropTypes"></a>

## inputmaskPropTypes
See source code for detailed prop types or [here](https://github.com/RobinHerbots/jquery.inputmask) for more info.


* * *

