## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#Dialog">Dialog</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#DialogButtons">DialogButtons</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#DialogSystem">DialogSystem</a></td>
    <td><p>Wrap your app with a DialogSystem instance to make dialogs available. You only need one of these per app.</p>
</td>
    </tr>
</tbody>
</table>

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

