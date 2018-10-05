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

