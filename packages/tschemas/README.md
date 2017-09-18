# tschemas

[![Greenkeeper badge](https://badges.greenkeeper.io/thr-consulting/tschemas.svg)](https://greenkeeper.io/) [![CircleCI](https://circleci.com/gh/thr-consulting/tschemas.svg?style=svg)](https://circleci.com/gh/thr-consulting/tschemas) ![Coverage](http://circlebadge.bgsemc.com/github/thr-consulting/tschemas/master/coverage)

Useful yup schema shortcuts

## Install
```
yarn add @thx/tschemas
```

## Usage

### Client
```
import yup from 'yup';
import {localDate} from '@thx/tschemas';

const schema = yup.shape({
  myDate: localDate().required(),
});
```

### Server

The server side relies on Meteor to be configured first.

```js
import {Meteor} from 'meteor/meteor';
import {setTSchemaConfig, schemaValidate} from '@thx/schemas/dist/serverIndex.js';

setTSchemaConfig({Meteor});

schemaValidate(mySchema, myObj);
```

## Documentation

You can find API documentation [here](/docs).
