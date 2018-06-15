## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#transformDateToLocalDate">transformDateToLocalDate(date)</a> ⇒ <code>LocalDate</code></td>
    <td><p>Transforms a JS Date to a LocalDate</p>
</td>
    </tr>
<tr>
    <td><a href="#transformLocalDateToDate">transformLocalDateToDate(localDate)</a> ⇒ <code>Date</code></td>
    <td><p>Transforms a LocalDate to a JS Date</p>
</td>
    </tr>
<tr>
    <td><a href="#transformMomentToLocalDate">transformMomentToLocalDate(obj)</a> ⇒ <code>LocalDate</code></td>
    <td><p>Transforms a Moment to a LocalDate</p>
</td>
    </tr>
<tr>
    <td><a href="#transformLocalDateToMoment">transformLocalDateToMoment(localDate)</a> ⇒ <code>*</code> | <code>moment.Moment</code></td>
    <td><p>Transforms a LocalDate to a Moment</p>
</td>
    </tr>
<tr>
    <td><a href="#transformEpochIntegerToLocalDate">transformEpochIntegerToLocalDate(value)</a> ⇒ <code>JSJoda.LocalDate</code></td>
    <td><p>Transforms an epoch integer into a LocalDate</p>
</td>
    </tr>
<tr>
    <td><a href="#transformEpochIntegerToDate">transformEpochIntegerToDate(value)</a> ⇒ <code>Date</code></td>
    <td><p>Transforms an epoch integer into a Date</p>
</td>
    </tr>
<tr>
    <td><a href="#transformLocalDateToEpochInteger">transformLocalDateToEpochInteger(value)</a> ⇒ <code>*</code></td>
    <td><p>Transforms a LocalDate into an epoch integer</p>
</td>
    </tr>
<tr>
    <td><a href="#transformDateToEpochInteger">transformDateToEpochInteger(value)</a> ⇒ <code>*</code></td>
    <td><p>Transforms a Date to an epoch integer</p>
</td>
    </tr>
<tr>
    <td><a href="#transformMomentsToDate">transformMomentsToDate(obj)</a> ⇒ <code>Date</code> | <code>Array.&lt;Date&gt;</code></td>
    <td><p>Transforms a moment or array of moments to JS Dates</p>
</td>
    </tr>
<tr>
    <td><a href="#transformDatesToMoment">transformDatesToMoment(obj)</a> ⇒ <code>moment</code> | <code>Array.&lt;moment&gt;</code></td>
    <td><p>Transforms a date or array of dates to moments</p>
</td>
    </tr>
<tr>
    <td><a href="#transformLocalDatesToEpochInteger">transformLocalDatesToEpochInteger(obj)</a> ⇒ <code>*</code></td>
    <td><p>Transforms anything that is a LocalDate into epoch integer&#39;s. Iterates over arrays and object keys.</p>
</td>
    </tr>
<tr>
    <td><a href="#mapEpochIntegerToLocalDates">mapEpochIntegerToLocalDates(obj, paths)</a> ⇒ <code>*</code></td>
    <td><p>Transforms anything that has epoch integers into LocalDates. You need to specify which path&#39;s are EpochIntegers in paths.</p>
</td>
    </tr>
<tr>
    <td><a href="#transformObjectsToLocalDates">transformObjectsToLocalDates(obj)</a> ⇒ <code>*</code></td>
    <td><p>Transforms anything that has LocalDate style objects into LocalDates.</p>
</td>
    </tr>
<tr>
    <td><a href="#formatDate">formatDate(obj, [type], [time], [date], [format])</a> ⇒ <code>string</code></td>
    <td><p>Formats a date to a predefined style</p>
</td>
    </tr>
</tbody>
</table>

<a name="transformDateToLocalDate"></a>

## transformDateToLocalDate(date)

| Param |
| --- |
| date | 

Transforms a JS Date to a LocalDate


* * *

<a name="transformLocalDateToDate"></a>

## transformLocalDateToDate(localDate)

| Param |
| --- |
| localDate | 

Transforms a LocalDate to a JS Date


* * *

<a name="transformMomentToLocalDate"></a>

## transformMomentToLocalDate(obj)

| Param |
| --- |
| obj | 

Transforms a Moment to a LocalDate


* * *

<a name="transformLocalDateToMoment"></a>

## transformLocalDateToMoment(localDate)

| Param |
| --- |
| localDate | 

Transforms a LocalDate to a Moment


* * *

<a name="transformEpochIntegerToLocalDate"></a>

## transformEpochIntegerToLocalDate(value)

| Param |
| --- |
| value | 

Transforms an epoch integer into a LocalDate


* * *

<a name="transformEpochIntegerToDate"></a>

## transformEpochIntegerToDate(value)

| Param |
| --- |
| value | 

Transforms an epoch integer into a Date


* * *

<a name="transformLocalDateToEpochInteger"></a>

## transformLocalDateToEpochInteger(value)

| Param |
| --- |
| value | 

Transforms a LocalDate into an epoch integer


* * *

<a name="transformDateToEpochInteger"></a>

## transformDateToEpochInteger(value)

| Param |
| --- |
| value | 

Transforms a Date to an epoch integer


* * *

<a name="transformMomentsToDate"></a>

## transformMomentsToDate(obj)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>moment</code> \| <code>Array.&lt;moment&gt;</code> | Moment or array of Moments |

Transforms a moment or array of moments to JS Dates

**Returns**: <code>Date</code> \| <code>Array.&lt;Date&gt;</code> - A single date or array of dates  

* * *

<a name="transformDatesToMoment"></a>

## transformDatesToMoment(obj)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>date</code> \| <code>Array.&lt;date&gt;</code> | Date or array of Dates |

Transforms a date or array of dates to moments

**Returns**: <code>moment</code> \| <code>Array.&lt;moment&gt;</code> - A single moment or array of moments  

* * *

<a name="transformLocalDatesToEpochInteger"></a>

## transformLocalDatesToEpochInteger(obj)

| Param |
| --- |
| obj | 

Transforms anything that is a LocalDate into epoch integer's. Iterates over arrays and object keys.


* * *

<a name="mapEpochIntegerToLocalDates"></a>

## mapEpochIntegerToLocalDates(obj, paths)

| Param |
| --- |
| obj | 
| paths | 

Transforms anything that has epoch integers into LocalDates. You need to specify which path's are EpochIntegers in paths.


* * *

<a name="transformObjectsToLocalDates"></a>

## transformObjectsToLocalDates(obj)

| Param |
| --- |
| obj | 

Transforms anything that has LocalDate style objects into LocalDates.


* * *

<a name="formatDate"></a>

## formatDate(obj, [type], [time], [date], [format])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Date</code> \| <code>moment</code> \| <code>LocalDate</code> \| <code>number</code> |  | The date or moment object or LocalDate object |
| [type] | <code>string</code> | <code>&quot;short&quot;</code> | options.type - short, medium, or long |
| [time] | <code>bool</code> | <code>false</code> | options.time - If true, displays the time |
| [date] | <code>bool</code> | <code>true</code> | options.date - If true, displays the date |
| [format] | <code>string</code> | <code>null</code> | options.format - If specified, overrides with a moment.format() string |

Formats a date to a predefined style

**Returns**: <code>string</code> - The formatted date/time  

* * *

