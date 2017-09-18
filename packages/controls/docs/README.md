## Classes

<dl>
<dt><a href="#FieldMap">FieldMap</a></dt>
<dd></dd>
<dt><a href="#RadioGroup">RadioGroup</a></dt>
<dd></dd>
<dt><a href="#ResponsiveMenu">ResponsiveMenu</a></dt>
<dd></dd>
<dt><a href="#SField">SField</a></dt>
<dd></dd>
<dt><a href="#SForm">SForm</a></dt>
<dd></dd>
<dt><a href="#SFormSummary">SFormSummary</a></dt>
<dd></dd>
<dt><a href="#FieldMap">FieldMap</a></dt>
<dd></dd>
<dt><a href="#RadioGroup">RadioGroup</a></dt>
<dd></dd>
<dt><a href="#ResponsiveMenu">ResponsiveMenu</a></dt>
<dd></dd>
<dt><a href="#SField">SField</a></dt>
<dd></dd>
<dt><a href="#SForm">SForm</a></dt>
<dd></dd>
<dt><a href="#SFormSummary">SFormSummary</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#inputmaskPropTypes">inputmaskPropTypes</a> : <code>Object</code></dt>
<dd><p>See source code for detailed prop types or <a href="https://github.com/RobinHerbots/jquery.inputmask">here</a> for more info.</p>
</dd>
<dt><a href="#inputmaskPropTypes">inputmaskPropTypes</a> : <code>Object</code></dt>
<dd><p>See source code for detailed prop types or <a href="https://github.com/RobinHerbots/jquery.inputmask">here</a> for more info.</p>
</dd>
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

<a name="RadioGroup"></a>

## RadioGroup
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>Array.&lt;Component&gt;</code> | Radio or Form.Radio components |
| onChange | <code>onChange</code> | Standard onChange handler |
| value | <code>bool</code> \| <code>number</code> \| <code>string</code> \| <code>Object</code> | The currently selected radio item |


* [RadioGroup](#RadioGroup)
    * [new RadioGroup()](#new_RadioGroup_new)
    * [new RadioGroup()](#new_RadioGroup_new)

<a name="new_RadioGroup_new"></a>

### new RadioGroup()
Groups React Semantic UI Radio elements into a single group

<a name="new_RadioGroup_new"></a>

### new RadioGroup()
Groups React Semantic UI Radio elements into a single group

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
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| showSummary | <code>boolean</code> | <code>false</code> | If true, displays the summary above the form children. |
| children | <code>Array.&lt;Components&gt;</code> |  | Child React elements. |
| otherErrors | <code>Array.&lt;string&gt;</code> |  | An array of error strings passed to the SFormSummary. |


* [SForm](#SForm)
    * [new SForm()](#new_SForm_new)
    * [new SForm()](#new_SForm_new)

<a name="new_SForm_new"></a>

### new SForm()
Renders a React Formal form using SemanticUI.

<a name="new_SForm_new"></a>

### new SForm()
Renders a React Formal form using SemanticUI.

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

<a name="RadioGroup"></a>

## RadioGroup
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| children | <code>Array.&lt;Component&gt;</code> | Radio or Form.Radio components |
| onChange | <code>onChange</code> | Standard onChange handler |
| value | <code>bool</code> \| <code>number</code> \| <code>string</code> \| <code>Object</code> | The currently selected radio item |


* [RadioGroup](#RadioGroup)
    * [new RadioGroup()](#new_RadioGroup_new)
    * [new RadioGroup()](#new_RadioGroup_new)

<a name="new_RadioGroup_new"></a>

### new RadioGroup()
Groups React Semantic UI Radio elements into a single group

<a name="new_RadioGroup_new"></a>

### new RadioGroup()
Groups React Semantic UI Radio elements into a single group

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
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| showSummary | <code>boolean</code> | <code>false</code> | If true, displays the summary above the form children. |
| children | <code>Array.&lt;Components&gt;</code> |  | Child React elements. |
| otherErrors | <code>Array.&lt;string&gt;</code> |  | An array of error strings passed to the SFormSummary. |


* [SForm](#SForm)
    * [new SForm()](#new_SForm_new)
    * [new SForm()](#new_SForm_new)

<a name="new_SForm_new"></a>

### new SForm()
Renders a React Formal form using SemanticUI.

<a name="new_SForm_new"></a>

### new SForm()
Renders a React Formal form using SemanticUI.

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

<a name="inputmaskPropTypes"></a>

## inputmaskPropTypes : <code>Object</code>
See source code for detailed prop types or [here](https://github.com/RobinHerbots/jquery.inputmask) for more info.

**Kind**: global typedef  
<a name="inputmaskPropTypes"></a>

## inputmaskPropTypes : <code>Object</code>
See source code for detailed prop types or [here](https://github.com/RobinHerbots/jquery.inputmask) for more info.

**Kind**: global typedef  
