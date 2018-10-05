---
sidebar_label: Dialog
title: Dialog
---

[![](assets/coverage/dialog/coverage.svg)](assets/coverage/dialog/index.html)

Dialog Addon that slides up from the bottom of the screen

## Install
```
yarn add @thx/dialog
```
<a name="Dialog"></a>

## Dialog
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>ChildrenArray</code> | Dialog internal components |


* * *

<a name="new_Dialog_new"></a>

### new Dialog()
A container component for custom slide up dialogs.


* * *

<a name="DialogButtons"></a>

## DialogButtons
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| children | <code>ChildrenArray</code> |  | Override with custom buttons if needed. |
| onApprove | <code>function</code> |  | Called when the dialog is approved. |
| onReject | <code>function</code> |  | Called when the dialog is canceled. |
| onRemove | <code>function</code> |  | Called when the delete action is clicked. |
| [container] | <code>bool</code> | <code>true</code> | If true, applies the Semantic UI container class to the buttons. |


* * *

<a name="new_DialogButtons_new"></a>

### new DialogButtons()
Standard set of buttons for use with Dialog.


* * *

<a name="DialogSystem"></a>

## DialogSystem
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>Array.&lt;Component&gt;</code> | Your application components. |

Wrap your app with a DialogSystem instance to make dialogs available. You only need one of these per app.


* * *

<a name="DialogSystem.showDialog"></a>

### *DialogSystem*.showDialog(component, options)
**Tag**: Context  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>Element</code> | The Dialog component to display. |
| options | <code>object</code> | Custom React Dock props. |

Shows a dialog. This method is available via the React Context.


* * *

