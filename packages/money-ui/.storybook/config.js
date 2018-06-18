import {configure} from '@storybook/react';
import '@storybook/addon-console';
// import { addDecorator } from '@storybook/react';
// import { withConsole } from '@storybook/addon-console';

const req = require.context('../stories', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

// addDecorator((storyFn, context) => withConsole()(storyFn)(context));
