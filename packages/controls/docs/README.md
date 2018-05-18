## Classes

<dl>
<dt><a href="#FieldMap">FieldMap</a></dt>
<dd></dd>
<dt><a href="#MaskedInput">MaskedInput</a></dt>
<dd><p>Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
hundreds of these on one screen at the same time.</p>
</dd>
<dt><a href="#RadioGroup">RadioGroup</a></dt>
<dd><p>Groups React Semantic UI Radio elements into a single group</p>
</dd>
<dt><a href="#ResponsiveMenu">ResponsiveMenu</a></dt>
<dd></dd>
<dt><a href="#SField">SField</a></dt>
<dd></dd>
<dt><a href="#SForm">SForm</a></dt>
<dd><p>Renders a React Formal form using SemanticUI.</p>
</dd>
<dt><a href="#SFormSummary">SFormSummary</a></dt>
<dd></dd>
<dt><a href="#FieldMap">FieldMap</a></dt>
<dd></dd>
<dt><a href="#MaskedInput">MaskedInput</a></dt>
<dd><p>Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
hundreds of these on one screen at the same time.</p>
</dd>
<dt><a href="#RadioGroup">RadioGroup</a></dt>
<dd><p>Groups React Semantic UI Radio elements into a single group</p>
</dd>
<dt><a href="#ResponsiveMenu">ResponsiveMenu</a></dt>
<dd></dd>
<dt><a href="#SField">SField</a></dt>
<dd></dd>
<dt><a href="#SForm">SForm</a></dt>
<dd><p>Renders a React Formal form using SemanticUI.</p>
</dd>
<dt><a href="#SFormSummary">SFormSummary</a></dt>
<dd></dd>
</dl>

<a name="FieldMap"></a>

## FieldMap
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value of the field |
| as | <code>Component</code> | The React Component to render |
| asValue | <code>string</code> |  |
| onChange | <code>onChange</code> | The normal onChange handler |


* [FieldMap](#FieldMap)
    * [new FieldMap()](#new_FieldMap_new)
    * [new FieldMap()](#new_FieldMap_new)

<a name="new_FieldMap_new"></a>

### new FieldMap()
Maps onChange handler parameters from (event, data) to just (data).

<a name="new_FieldMap_new"></a>

### new FieldMap()
Maps onChange handler parameters from (event, data) to just (data).

<a name="MaskedInput"></a>

## MaskedInput
Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
hundreds of these on one screen at the same time.

**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>string</code> \| <code>number</code> | <code>null</code> | The value to display |
| [onChange] | <code>onChange</code> | <code></code> | Called when the value changes. |
| [mask] | <code>inputmaskPropTypes</code> | <code></code> | The mask object specified at [here](https://github.com/RobinHerbots/jquery.inputmask). |

<a name="RadioGroup"></a>

## RadioGroup
Groups React Semantic UI Radio elements into a single group

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>Array.&lt;Component&gt;</code> | Radio or Form.Radio components |
| onChange | <code>onChange</code> | Standard onChange handler |
| value | <code>bool</code> \| <code>number</code> \| <code>string</code> \| <code>Object</code> | The currently selected radio item |

<a name="ResponsiveMenu"></a>

## ResponsiveMenu
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mobileWidth | <code>number</code> | The number of pixels defining mobile cutoff |
| children | <code>Array.&lt;Component&gt;</code> | ResponsiveMenu.Item or ResponsiveMenu.Dropdown |


* [ResponsiveMenu](#ResponsiveMenu)
    * [new ResponsiveMenu()](#new_ResponsiveMenu_new)
    * [new ResponsiveMenu()](#new_ResponsiveMenu_new)

<a name="new_ResponsiveMenu_new"></a>

### new ResponsiveMenu()
Displays a mobile responsive menu

<a name="new_ResponsiveMenu_new"></a>

### new ResponsiveMenu()
Displays a mobile responsive menu

<a name="SField"></a>

## SField
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| for | <code>string</code> | The React Formal Form.Field name. |
| children | <code>Array.&lt;Component&gt;</code> | React children elements. |
| className | <code>string</code> | Additional class names applied to the field div. |
| messages | <code>Array.&lt;Object&gt;</code> | Error messages from React Formal form. |


* [SField](#SField)
    * [new SField()](#new_SField_new)
    * [new SField()](#new_SField_new)

<a name="new_SField_new"></a>

### new SField()
A SemanticUI field with error markings.

<a name="new_SField_new"></a>

### new SField()
A SemanticUI field with error markings.

<a name="SForm"></a>

## SForm
Renders a React Formal form using SemanticUI.

**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showSummary] | <code>boolean</code> | <code>false</code> | If true, displays the summary above the form children. |
| children | <code>Array.&lt;Components&gt;</code> |  | Child React elements. |
| otherErrors | <code>Array.&lt;string&gt;</code> |  | An array of error strings passed to the SFormSummary. |

<a name="SFormSummary"></a>

## SFormSummary
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| otherErrors | <code>Array.&lt;string&gt;</code> | An array of additional errors strings to display. |


* [SFormSummary](#SFormSummary)
    * [new SFormSummary()](#new_SFormSummary_new)
    * [new SFormSummary()](#new_SFormSummary_new)

<a name="new_SFormSummary_new"></a>

### new SFormSummary()
Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.

<a name="new_SFormSummary_new"></a>

### new SFormSummary()
Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.

<a name="FieldMap"></a>

## FieldMap
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value of the field |
| as | <code>Component</code> | The React Component to render |
| asValue | <code>string</code> |  |
| onChange | <code>onChange</code> | The normal onChange handler |


* [FieldMap](#FieldMap)
    * [new FieldMap()](#new_FieldMap_new)
    * [new FieldMap()](#new_FieldMap_new)

<a name="new_FieldMap_new"></a>

### new FieldMap()
Maps onChange handler parameters from (event, data) to just (data).

<a name="new_FieldMap_new"></a>

### new FieldMap()
Maps onChange handler parameters from (event, data) to just (data).

<a name="MaskedInput"></a>

## MaskedInput
Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
hundreds of these on one screen at the same time.

**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>string</code> \| <code>number</code> | <code>null</code> | The value to display |
| [onChange] | <code>onChange</code> | <code></code> | Called when the value changes. |
| [mask] | <code>inputmaskPropTypes</code> | <code></code> | The mask object specified at [here](https://github.com/RobinHerbots/jquery.inputmask). |

<a name="RadioGroup"></a>

## RadioGroup
Groups React Semantic UI Radio elements into a single group

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>Array.&lt;Component&gt;</code> | Radio or Form.Radio components |
| onChange | <code>onChange</code> | Standard onChange handler |
| value | <code>bool</code> \| <code>number</code> \| <code>string</code> \| <code>Object</code> | The currently selected radio item |

<a name="ResponsiveMenu"></a>

## ResponsiveMenu
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mobileWidth | <code>number</code> | The number of pixels defining mobile cutoff |
| children | <code>Array.&lt;Component&gt;</code> | ResponsiveMenu.Item or ResponsiveMenu.Dropdown |


* [ResponsiveMenu](#ResponsiveMenu)
    * [new ResponsiveMenu()](#new_ResponsiveMenu_new)
    * [new ResponsiveMenu()](#new_ResponsiveMenu_new)

<a name="new_ResponsiveMenu_new"></a>

### new ResponsiveMenu()
Displays a mobile responsive menu

<a name="new_ResponsiveMenu_new"></a>

### new ResponsiveMenu()
Displays a mobile responsive menu

<a name="SField"></a>

## SField
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| for | <code>string</code> | The React Formal Form.Field name. |
| children | <code>Array.&lt;Component&gt;</code> | React children elements. |
| className | <code>string</code> | Additional class names applied to the field div. |
| messages | <code>Array.&lt;Object&gt;</code> | Error messages from React Formal form. |


* [SField](#SField)
    * [new SField()](#new_SField_new)
    * [new SField()](#new_SField_new)

<a name="new_SField_new"></a>

### new SField()
A SemanticUI field with error markings.

<a name="new_SField_new"></a>

### new SField()
A SemanticUI field with error markings.

<a name="SForm"></a>

## SForm
Renders a React Formal form using SemanticUI.

**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showSummary] | <code>boolean</code> | <code>false</code> | If true, displays the summary above the form children. |
| children | <code>Array.&lt;Components&gt;</code> |  | Child React elements. |
| otherErrors | <code>Array.&lt;string&gt;</code> |  | An array of error strings passed to the SFormSummary. |

<a name="SFormSummary"></a>

## SFormSummary
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| otherErrors | <code>Array.&lt;string&gt;</code> | An array of additional errors strings to display. |


* [SFormSummary](#SFormSummary)
    * [new SFormSummary()](#new_SFormSummary_new)
    * [new SFormSummary()](#new_SFormSummary_new)

<a name="new_SFormSummary_new"></a>

### new SFormSummary()
Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.

<a name="new_SFormSummary_new"></a>

### new SFormSummary()
Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.

