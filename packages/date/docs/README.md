## Classes

<dl>
<dt><a href="#DateTimePicker">DateTimePicker</a></dt>
<dd></dd>
<dt><a href="#LocalDatePicker">LocalDatePicker</a></dt>
<dd></dd>
<dt><a href="#LocalMonthSelect">LocalMonthSelect</a></dt>
<dd></dd>
<dt><a href="#MonthSelect">MonthSelect</a></dt>
<dd></dd>
<dt><a href="#DateTimePicker">DateTimePicker</a></dt>
<dd></dd>
<dt><a href="#LocalDatePicker">LocalDatePicker</a></dt>
<dd></dd>
<dt><a href="#LocalMonthSelect">LocalMonthSelect</a></dt>
<dd></dd>
<dt><a href="#MonthSelect">MonthSelect</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#dateInit">dateInit()</a></dt>
<dd><p>Initializes the date-time pickers</p>
</dd>
<dt><a href="#transformDateToLocalDate">transformDateToLocalDate(date)</a> ⇒ <code>LocalDate</code></dt>
<dd><p>Transforms a JS Date to a LocalDate</p>
</dd>
<dt><a href="#transformLocalDateToDate">transformLocalDateToDate(localDate)</a> ⇒ <code>Date</code></dt>
<dd><p>Transforms a LocalDate to a JS Date</p>
</dd>
<dt><a href="#transformMomentToLocalDate">transformMomentToLocalDate(obj)</a> ⇒ <code>LocalDate</code></dt>
<dd><p>Transforms a Moment to a LocalDate</p>
</dd>
<dt><a href="#transformLocalDateToMoment">transformLocalDateToMoment(localDate)</a> ⇒ <code>*</code> | <code>moment.Moment</code></dt>
<dd><p>Transforms a LocalDate to a Moment</p>
</dd>
<dt><a href="#transformMomentsToDate">transformMomentsToDate(obj)</a> ⇒ <code>Date</code> | <code>Array.&lt;Date&gt;</code></dt>
<dd><p>Transforms a moment or array of moments to JS Dates</p>
</dd>
<dt><a href="#transformDatesToMoment">transformDatesToMoment(obj)</a> ⇒ <code>moment</code> | <code>Array.&lt;moment&gt;</code></dt>
<dd><p>Transforms a date or array of dates to moments</p>
</dd>
<dt><a href="#transformLocalDatesToEpochInteger">transformLocalDatesToEpochInteger(obj)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that is a LocalDate into epoch integer&#39;s. Iterates over arrays and object keys.</p>
</dd>
<dt><a href="#transformEpochIntegerToLocalDate">transformEpochIntegerToLocalDate(value)</a> ⇒ <code>JSJoda.LocalDate</code></dt>
<dd><p>Transforms an epoch integer into a LocalDate</p>
</dd>
<dt><a href="#mapEpochIntegerToLocalDates">mapEpochIntegerToLocalDates(obj, paths)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that has epoch integers into LocalDates. You need to specify which path&#39;s are EpochIntegers in paths.</p>
</dd>
<dt><a href="#transformObjectsToLocalDates">transformObjectsToLocalDates(obj)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that has LocalDate style objects into LocalDates.</p>
</dd>
<dt><a href="#formatDate">formatDate(obj, [type], [time], [date], [format])</a> ⇒ <code>string</code></dt>
<dd><p>Formats a date to a predefined style</p>
</dd>
<dt><a href="#dateInit">dateInit()</a></dt>
<dd><p>Initializes the date-time pickers</p>
</dd>
<dt><a href="#transformDateToLocalDate">transformDateToLocalDate(date)</a> ⇒ <code>LocalDate</code></dt>
<dd><p>Transforms a JS Date to a LocalDate</p>
</dd>
<dt><a href="#transformLocalDateToDate">transformLocalDateToDate(localDate)</a> ⇒ <code>Date</code></dt>
<dd><p>Transforms a LocalDate to a JS Date</p>
</dd>
<dt><a href="#transformMomentToLocalDate">transformMomentToLocalDate(obj)</a> ⇒ <code>LocalDate</code></dt>
<dd><p>Transforms a Moment to a LocalDate</p>
</dd>
<dt><a href="#transformLocalDateToMoment">transformLocalDateToMoment(localDate)</a> ⇒ <code>*</code> | <code>moment.Moment</code></dt>
<dd><p>Transforms a LocalDate to a Moment</p>
</dd>
<dt><a href="#transformMomentsToDate">transformMomentsToDate(obj)</a> ⇒ <code>Date</code> | <code>Array.&lt;Date&gt;</code></dt>
<dd><p>Transforms a moment or array of moments to JS Dates</p>
</dd>
<dt><a href="#transformDatesToMoment">transformDatesToMoment(obj)</a> ⇒ <code>moment</code> | <code>Array.&lt;moment&gt;</code></dt>
<dd><p>Transforms a date or array of dates to moments</p>
</dd>
<dt><a href="#transformLocalDatesToEpochInteger">transformLocalDatesToEpochInteger(obj)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that is a LocalDate into epoch integer&#39;s. Iterates over arrays and object keys.</p>
</dd>
<dt><a href="#transformEpochIntegerToLocalDate">transformEpochIntegerToLocalDate(value)</a> ⇒ <code>JSJoda.LocalDate</code></dt>
<dd><p>Transforms an epoch integer into a LocalDate</p>
</dd>
<dt><a href="#mapEpochIntegerToLocalDates">mapEpochIntegerToLocalDates(obj, paths)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that has epoch integers into LocalDates. You need to specify which path&#39;s are EpochIntegers in paths.</p>
</dd>
<dt><a href="#transformObjectsToLocalDates">transformObjectsToLocalDates(obj)</a> ⇒ <code>*</code></dt>
<dd><p>Transforms anything that has LocalDate style objects into LocalDates.</p>
</dd>
<dt><a href="#formatDate">formatDate(obj, [type], [time], [date], [format])</a> ⇒ <code>string</code></dt>
<dd><p>Formats a date to a predefined style</p>
</dd>
</dl>

<a name="DateTimePicker"></a>

## DateTimePicker
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>string</code> | <code>null</code> | If set to 'auto' the input fills the width. |
| value | <code>Date</code> |  | The JS Date object |
| onChange | <code>onChange</code> |  | Called when the value changes. |


* [DateTimePicker](#DateTimePicker)
    * [new DateTimePicker()](#new_DateTimePicker_new)
    * [new DateTimePicker()](#new_DateTimePicker_new)

<a name="new_DateTimePicker_new"></a>

### new DateTimePicker()
DateTimePicker from [React Widgets](https://jquense.github.io/react-widgets/docs/#/datetime-picker).

<a name="new_DateTimePicker_new"></a>

### new DateTimePicker()
DateTimePicker from [React Widgets](https://jquense.github.io/react-widgets/docs/#/datetime-picker).

<a name="LocalDatePicker"></a>

## LocalDatePicker
**Kind**: global class  
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


* [LocalDatePicker](#LocalDatePicker)
    * [new LocalDatePicker()](#new_LocalDatePicker_new)
    * [new LocalDatePicker()](#new_LocalDatePicker_new)

<a name="new_LocalDatePicker_new"></a>

### new LocalDatePicker()
Let's you pick a LocalDate. No time parts are recorded.

<a name="new_LocalDatePicker_new"></a>

### new LocalDatePicker()
Let's you pick a LocalDate. No time parts are recorded.

<a name="LocalMonthSelect"></a>

## LocalMonthSelect
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| value | <code>Date</code> |  | The value in date form. Day is ignored. |
| year | <code>number</code> | <code>Current Year</code> | The year to use when selecting a date. |


* [LocalMonthSelect](#LocalMonthSelect)
    * [new LocalMonthSelect()](#new_LocalMonthSelect_new)
    * [new LocalMonthSelect()](#new_LocalMonthSelect_new)

<a name="new_LocalMonthSelect_new"></a>

### new LocalMonthSelect()
Month select dropdown

<a name="new_LocalMonthSelect_new"></a>

### new LocalMonthSelect()
Month select dropdown

<a name="MonthSelect"></a>

## MonthSelect
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| value | <code>Date</code> |  | The value in date form. Day is ignored. |
| year | <code>number</code> | <code>Current Year</code> | The year to use when selecting a date. |


* [MonthSelect](#MonthSelect)
    * [new MonthSelect()](#new_MonthSelect_new)
    * [new MonthSelect()](#new_MonthSelect_new)

<a name="new_MonthSelect_new"></a>

### new MonthSelect()
Month select dropdown

<a name="new_MonthSelect_new"></a>

### new MonthSelect()
Month select dropdown

<a name="DateTimePicker"></a>

## DateTimePicker
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>string</code> | <code>null</code> | If set to 'auto' the input fills the width. |
| value | <code>Date</code> |  | The JS Date object |
| onChange | <code>onChange</code> |  | Called when the value changes. |


* [DateTimePicker](#DateTimePicker)
    * [new DateTimePicker()](#new_DateTimePicker_new)
    * [new DateTimePicker()](#new_DateTimePicker_new)

<a name="new_DateTimePicker_new"></a>

### new DateTimePicker()
DateTimePicker from [React Widgets](https://jquense.github.io/react-widgets/docs/#/datetime-picker).

<a name="new_DateTimePicker_new"></a>

### new DateTimePicker()
DateTimePicker from [React Widgets](https://jquense.github.io/react-widgets/docs/#/datetime-picker).

<a name="LocalDatePicker"></a>

## LocalDatePicker
**Kind**: global class  
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


* [LocalDatePicker](#LocalDatePicker)
    * [new LocalDatePicker()](#new_LocalDatePicker_new)
    * [new LocalDatePicker()](#new_LocalDatePicker_new)

<a name="new_LocalDatePicker_new"></a>

### new LocalDatePicker()
Let's you pick a LocalDate. No time parts are recorded.

<a name="new_LocalDatePicker_new"></a>

### new LocalDatePicker()
Let's you pick a LocalDate. No time parts are recorded.

<a name="LocalMonthSelect"></a>

## LocalMonthSelect
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| value | <code>Date</code> |  | The value in date form. Day is ignored. |
| year | <code>number</code> | <code>Current Year</code> | The year to use when selecting a date. |


* [LocalMonthSelect](#LocalMonthSelect)
    * [new LocalMonthSelect()](#new_LocalMonthSelect_new)
    * [new LocalMonthSelect()](#new_LocalMonthSelect_new)

<a name="new_LocalMonthSelect_new"></a>

### new LocalMonthSelect()
Month select dropdown

<a name="new_LocalMonthSelect_new"></a>

### new LocalMonthSelect()
Month select dropdown

<a name="MonthSelect"></a>

## MonthSelect
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | <code>onChange</code> |  | Called when the value changes. |
| value | <code>Date</code> |  | The value in date form. Day is ignored. |
| year | <code>number</code> | <code>Current Year</code> | The year to use when selecting a date. |


* [MonthSelect](#MonthSelect)
    * [new MonthSelect()](#new_MonthSelect_new)
    * [new MonthSelect()](#new_MonthSelect_new)

<a name="new_MonthSelect_new"></a>

### new MonthSelect()
Month select dropdown

<a name="new_MonthSelect_new"></a>

### new MonthSelect()
Month select dropdown

<a name="dateInit"></a>

## dateInit()
Initializes the date-time pickers

**Kind**: global function  
<a name="transformDateToLocalDate"></a>

## transformDateToLocalDate(date) ⇒ <code>LocalDate</code>
Transforms a JS Date to a LocalDate

**Kind**: global function  

| Param |
| --- |
| date | 

<a name="transformLocalDateToDate"></a>

## transformLocalDateToDate(localDate) ⇒ <code>Date</code>
Transforms a LocalDate to a JS Date

**Kind**: global function  

| Param |
| --- |
| localDate | 

<a name="transformMomentToLocalDate"></a>

## transformMomentToLocalDate(obj) ⇒ <code>LocalDate</code>
Transforms a Moment to a LocalDate

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="transformLocalDateToMoment"></a>

## transformLocalDateToMoment(localDate) ⇒ <code>\*</code> \| <code>moment.Moment</code>
Transforms a LocalDate to a Moment

**Kind**: global function  

| Param |
| --- |
| localDate | 

<a name="transformMomentsToDate"></a>

## transformMomentsToDate(obj) ⇒ <code>Date</code> \| <code>Array.&lt;Date&gt;</code>
Transforms a moment or array of moments to JS Dates

**Kind**: global function  
**Returns**: <code>Date</code> \| <code>Array.&lt;Date&gt;</code> - A single date or array of dates  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>moment</code> \| <code>Array.&lt;moment&gt;</code> | Moment or array of Moments |

<a name="transformDatesToMoment"></a>

## transformDatesToMoment(obj) ⇒ <code>moment</code> \| <code>Array.&lt;moment&gt;</code>
Transforms a date or array of dates to moments

**Kind**: global function  
**Returns**: <code>moment</code> \| <code>Array.&lt;moment&gt;</code> - A single moment or array of moments  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>date</code> \| <code>Array.&lt;date&gt;</code> | Date or array of Dates |

<a name="transformLocalDatesToEpochInteger"></a>

## transformLocalDatesToEpochInteger(obj) ⇒ <code>\*</code>
Transforms anything that is a LocalDate into epoch integer's. Iterates over arrays and object keys.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="transformEpochIntegerToLocalDate"></a>

## transformEpochIntegerToLocalDate(value) ⇒ <code>JSJoda.LocalDate</code>
Transforms an epoch integer into a LocalDate

**Kind**: global function  

| Param |
| --- |
| value | 

<a name="mapEpochIntegerToLocalDates"></a>

## mapEpochIntegerToLocalDates(obj, paths) ⇒ <code>\*</code>
Transforms anything that has epoch integers into LocalDates. You need to specify which path's are EpochIntegers in paths.

**Kind**: global function  

| Param |
| --- |
| obj | 
| paths | 

<a name="transformObjectsToLocalDates"></a>

## transformObjectsToLocalDates(obj) ⇒ <code>\*</code>
Transforms anything that has LocalDate style objects into LocalDates.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="formatDate"></a>

## formatDate(obj, [type], [time], [date], [format]) ⇒ <code>string</code>
Formats a date to a predefined style

**Kind**: global function  
**Returns**: <code>string</code> - The formatted date/time  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Date</code> \| <code>moment</code> \| <code>LocalDate</code> |  | The date or moment object or LocalDate object |
| [type] | <code>string</code> | <code>&quot;short&quot;</code> | options.type - short, medium, or long |
| [time] | <code>bool</code> | <code>false</code> | options.time - If true, displays the time |
| [date] | <code>bool</code> | <code>true</code> | options.date - If true, displays the date |
| [format] | <code>string</code> | <code>null</code> | options.format - If specified, overrides with a moment.format() string |

<a name="dateInit"></a>

## dateInit()
Initializes the date-time pickers

**Kind**: global function  
<a name="transformDateToLocalDate"></a>

## transformDateToLocalDate(date) ⇒ <code>LocalDate</code>
Transforms a JS Date to a LocalDate

**Kind**: global function  

| Param |
| --- |
| date | 

<a name="transformLocalDateToDate"></a>

## transformLocalDateToDate(localDate) ⇒ <code>Date</code>
Transforms a LocalDate to a JS Date

**Kind**: global function  

| Param |
| --- |
| localDate | 

<a name="transformMomentToLocalDate"></a>

## transformMomentToLocalDate(obj) ⇒ <code>LocalDate</code>
Transforms a Moment to a LocalDate

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="transformLocalDateToMoment"></a>

## transformLocalDateToMoment(localDate) ⇒ <code>\*</code> \| <code>moment.Moment</code>
Transforms a LocalDate to a Moment

**Kind**: global function  

| Param |
| --- |
| localDate | 

<a name="transformMomentsToDate"></a>

## transformMomentsToDate(obj) ⇒ <code>Date</code> \| <code>Array.&lt;Date&gt;</code>
Transforms a moment or array of moments to JS Dates

**Kind**: global function  
**Returns**: <code>Date</code> \| <code>Array.&lt;Date&gt;</code> - A single date or array of dates  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>moment</code> \| <code>Array.&lt;moment&gt;</code> | Moment or array of Moments |

<a name="transformDatesToMoment"></a>

## transformDatesToMoment(obj) ⇒ <code>moment</code> \| <code>Array.&lt;moment&gt;</code>
Transforms a date or array of dates to moments

**Kind**: global function  
**Returns**: <code>moment</code> \| <code>Array.&lt;moment&gt;</code> - A single moment or array of moments  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>date</code> \| <code>Array.&lt;date&gt;</code> | Date or array of Dates |

<a name="transformLocalDatesToEpochInteger"></a>

## transformLocalDatesToEpochInteger(obj) ⇒ <code>\*</code>
Transforms anything that is a LocalDate into epoch integer's. Iterates over arrays and object keys.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="transformEpochIntegerToLocalDate"></a>

## transformEpochIntegerToLocalDate(value) ⇒ <code>JSJoda.LocalDate</code>
Transforms an epoch integer into a LocalDate

**Kind**: global function  

| Param |
| --- |
| value | 

<a name="mapEpochIntegerToLocalDates"></a>

## mapEpochIntegerToLocalDates(obj, paths) ⇒ <code>\*</code>
Transforms anything that has epoch integers into LocalDates. You need to specify which path's are EpochIntegers in paths.

**Kind**: global function  

| Param |
| --- |
| obj | 
| paths | 

<a name="transformObjectsToLocalDates"></a>

## transformObjectsToLocalDates(obj) ⇒ <code>\*</code>
Transforms anything that has LocalDate style objects into LocalDates.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="formatDate"></a>

## formatDate(obj, [type], [time], [date], [format]) ⇒ <code>string</code>
Formats a date to a predefined style

**Kind**: global function  
**Returns**: <code>string</code> - The formatted date/time  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Date</code> \| <code>moment</code> \| <code>LocalDate</code> |  | The date or moment object or LocalDate object |
| [type] | <code>string</code> | <code>&quot;short&quot;</code> | options.type - short, medium, or long |
| [time] | <code>bool</code> | <code>false</code> | options.time - If true, displays the time |
| [date] | <code>bool</code> | <code>true</code> | options.date - If true, displays the date |
| [format] | <code>string</code> | <code>null</code> | options.format - If specified, overrides with a moment.format() string |

