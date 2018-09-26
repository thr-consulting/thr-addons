## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#DatePickerEpochDate">DatePickerEpochDate</a></td>
    <td><p>Let&#39;s you pick a LocalDate. No time parts are recorded.</p>
</td>
    </tr>
<tr>
    <td><a href="#DatePickerLocalDate">DatePickerLocalDate</a></td>
    <td><p>Let&#39;s you pick a LocalDate. No time parts are recorded.</p>
</td>
    </tr>
<tr>
    <td><a href="#DateTimePicker">DateTimePicker</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#EpochDatePicker">EpochDatePicker</a></td>
    <td><p>Let&#39;s you pick an epoch integer. No time parts are recorded.</p>
</td>
    </tr>
<tr>
    <td><a href="#LocalDatePicker">LocalDatePicker</a></td>
    <td><p>Let&#39;s you pick a LocalDate. No time parts are recorded.</p>
</td>
    </tr>
<tr>
    <td><a href="#LocalMonthSelect">LocalMonthSelect</a></td>
    <td><p>Month select dropdown</p>
</td>
    </tr>
<tr>
    <td><a href="#MonthSelect">MonthSelect</a></td>
    <td><p>Month select dropdown</p>
</td>
    </tr>
<tr>
    <td><a href="#FieldMap">FieldMap</a></td>
    <td></td>
    </tr>
<tr>
    <td><del><a href="#SField">SField</a></del></td>
    <td></td>
    </tr>
<tr>
    <td><del><a href="#SForm">SForm</a></del></td>
    <td><p>Renders a React Formal form using SemanticUI.</p>
</td>
    </tr>
<tr>
    <td><del><a href="#SFormSummary">SFormSummary</a></del></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#TForm">TForm</a></td>
    <td><p>Extends Formik to provide Semantic UI error and warning messages and field errors.</p>
</td>
    </tr>
<tr>
    <td><a href="#MaskedInput">MaskedInput</a></td>
    <td><p>Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
hundreds of these on one screen at the same time.</p>
</td>
    </tr>
<tr>
    <td><a href="#RadioGroup">RadioGroup</a></td>
    <td><p>Groups React Semantic UI Radio elements into a single group</p>
</td>
    </tr>
<tr>
    <td><a href="#SinEntry">SinEntry</a></td>
    <td><p>A SIN entry control. The main value is a boolean to show whether the SIN has been entered or not. This way the actual information doesn&#39;t pass into the client.
The onSinChange() prop will be called with the actual SIN text which can be sent to the server separately.</p>
</td>
    </tr>
<tr>
    <td><a href="#ResponsiveMenu">ResponsiveMenu</a></td>
    <td></td>
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
    <td><a href="#dateInit">dateInit()</a></td>
    <td><p>Initializes the date-time pickers</p>
</td>
    </tr>
</tbody>
</table>

<a name="DatePickerEpochDate"></a>

## DatePickerEpochDate
**Properties**

| Name |
| --- |
| value | 
| onChange | 

Let's you pick a LocalDate. No time parts are recorded.


* * *

<a name="DatePickerLocalDate"></a>

## DatePickerLocalDate
**Properties**

| Name |
| --- |
| value | 
| onChange | 

Let's you pick a LocalDate. No time parts are recorded.


* * *

<a name="DateTimePicker"></a>

## DateTimePicker
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [width] | <code>string</code> | <code>null</code> | If set to 'auto' the input fills the width. |
| value | <code>Date</code> |  | The JS Date object |
| onChange | <code>onChange</code> |  | Called when the value changes. |


* * *

<a name="new_DateTimePicker_new"></a>

### new DateTimePicker()
DateTimePicker from [React Widgets](https://jquense.github.io/react-widgets/docs/#/datetime-picker).


* * *

<a name="EpochDatePicker"></a>

## EpochDatePicker
**Properties**

| Name |
| --- |
| width | 
| value | 
| defaultValue | 
| onChange | 
| onSelect | 
| min | 
| max | 
| currentDate | 
| defaultCurrentDate | 
| onCurrentDateChange | 

Let's you pick an epoch integer. No time parts are recorded.


* * *

<a name="LocalDatePicker"></a>

## LocalDatePicker
**Properties**

| Name |
| --- |
| width | 
| value | 
| defaultValue | 
| onChange | 
| onSelect | 
| min | 
| max | 
| currentDate | 
| defaultCurrentDate | 
| onCurrentDateChange | 

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

<a name="MonthSelect"></a>

## MonthSelect
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| value | <code>Date</code> |  | The value in date form. Day is ignored. |
| [year] | <code>number</code> | <code>Current Year</code> | The year to use when selecting a date. |

Month select dropdown


* * *

<a name="FieldMap"></a>

## FieldMap
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value of the field |
| as | <code>Component</code> | The React Component to render |
| asValue | <code>string</code> |  |
| onChange | <code>onChange</code> | The normal onChange handler |


* * *

<a name="new_FieldMap_new"></a>

### new FieldMap()
Maps onChange handler parameters from (event, data) to just (data).


* * *

<a name="SField"></a>

## ~~SField~~
***Deprecated***

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| for | <code>string</code> | The React Formal Form.Field name. |
| children | <code>Array.&lt;Component&gt;</code> | React children elements. |
| className | <code>string</code> | Additional class names applied to the field div. |
| messages | <code>Array.&lt;Object&gt;</code> | Error messages from React Formal form. |


* * *

<a name="new_SField_new"></a>

### new SField()
A SemanticUI field with error markings.


* * *

<a name="SForm"></a>

## ~~SForm~~
***Deprecated***

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showSummary] | <code>boolean</code> | <code>false</code> | If true, displays the summary above the form children. |
| children | <code>Array.&lt;Components&gt;</code> |  | Child React elements. |
| otherErrors | <code>Array.&lt;string&gt;</code> |  | An array of error strings passed to the SFormSummary. |

Renders a React Formal form using SemanticUI.


* * *

<a name="SFormSummary"></a>

## ~~SFormSummary~~
***Deprecated***

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| otherErrors | <code>Array.&lt;string&gt;</code> | An array of additional errors strings to display. |


* * *

<a name="new_SFormSummary_new"></a>

### new SFormSummary()
Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.


* * *

<a name="TForm"></a>

## TForm
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| render | <code>function</code> | Render prop just like Formik's with additional arguments passed |
| numFields | <code>number</code> | The number of fields in the form. TForm can't automatically get this number. |
| errors |  | Used to pass in any GraphQL errors. |
| onSubmit | <code>function</code> | Called when the form submits. |
| getSubmitFn | <code>function</code> | Called when the TForm is mounted so you can get access to the submitForm function. |

Extends Formik to provide Semantic UI error and warning messages and field errors.


* * *

<a name="MaskedInput"></a>

## MaskedInput
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>string</code> \| <code>number</code> | <code>null</code> | The value to display |
| [onChange] | <code>onChange</code> | <code></code> | Called when the value changes. |
| [mask] | <code>inputmaskPropTypes</code> | <code></code> | The mask object specified at [here](https://github.com/RobinHerbots/jquery.inputmask). |

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

<a name="dateInit"></a>

## dateInit()
Initializes the date-time pickers


* * *

