---
sidebar_label: Date
title: Date
---

[![](assets/coverage/date/coverage.svg)](assets/coverage/date/index.html)

Date utilities

## Install
```
yarn add @thx/date
```
<a name="getMonthNames"></a>

## getMonthNames(year:, limitToCurrentMonth)

| Param | Type | Description |
| --- | --- | --- |
| year: | <code>number</code> | , The year to get the months for. |
| limitToCurrentMonth | <code>boolean</code> | = false: , If set to true returns all the months for the current year. |

Returns an array of month name strings up to the current month.


* * *

<a name="getNumberofDaysInMonth"></a>

## getNumberofDaysInMonth(month:, limitToCurrentDay, asArray)

| Param | Type | Description |
| --- | --- | --- |
| month: | <code>number</code> | , The number of the month to get where January = 1. |
| limitToCurrentDay | <code>boolean</code> | = false: , If set to true, returns number of days up to current day. |
| asArray | <code>boolean</code> | = false: , If set to true, returns array of days. |

Returns the number of days in a given month.


* * *

<a name="transformDateToLocalDate"></a>

## transformDateToLocalDate(date)

| Param |
| --- |
| date | 

Transforms a JS Date to a LocalDate


* * *

<a name="transformDateToLocalDateTime"></a>

## transformDateToLocalDateTime(date)

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

Transforms a JS Date to a LocalDateTime


* * *

<a name="transformLocalDateToDate"></a>

## transformLocalDateToDate(localDate)

| Param | Type |
| --- | --- |
| localDate | <code>LocalDate</code> | 

Transforms a LocalDate to a JS Date


* * *

<a name="transformMomentToLocalDate"></a>

## transformMomentToLocalDate(obj)

| Param | Type |
| --- | --- |
| obj | <code>moment.Moment</code> | 

Transforms a Moment to a LocalDate


* * *

<a name="transformMomentToLocalDateTime"></a>

## transformMomentToLocalDateTime(obj)

| Param | Type |
| --- | --- |
| obj | <code>moment.Moment</code> | 

Transforms a Moment to a LocalDateTime


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
| obj | <code>Date</code> \| <code>LocalDate</code> \| <code>number</code> \| <code>moment</code> |  | The Date, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, integer (epoch days), or moment |
| [type] | <code>string</code> | <code>&quot;short&quot;</code> | options.type - short, medium, or long |
| [time] | <code>bool</code> | <code>false</code> | options.time - If true, displays the time |
| [date] | <code>bool</code> | <code>true</code> | options.date - If true, displays the date |
| [format] | <code>string</code> | <code>null</code> | options.format - If specified, overrides with a moment.format() string |

Formats a date to a predefined style

**Returns**: <code>string</code> - The formatted date/time  

* * *

