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

