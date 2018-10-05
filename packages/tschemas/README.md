---
sidebar_label: TSchemas
title: TSchemas
---

[![](assets/coverage/tschemas/coverage.svg)](assets/coverage/tschemas/index.html)

Useful yup schema shortcuts

## Install
```bash
yarn add @thx/tschemas
```

## Usage

```js
import {shape} from 'yup';
import {localDate} from '@thx/tschemas';

const schema = shape({
  myDate: localDate().required(),
});
```
