# tschemas

Useful yup schema shortcuts

## Install
```
yarn add @thx/tschemas
```

## Usage

```
import yup from 'yup';
import {localDate} from '@thx/tschemas';

const schema = yup.shape({
  myDate: localDate().required(),
});
```

## Documentation

You can find API documentation [here](/docs).
