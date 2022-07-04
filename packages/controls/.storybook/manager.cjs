import {addons} from '@storybook/addons';
import {themes} from '@storybook/theming';

addons.setConfig({
	theme: process.env.VITE_THEME === 'light' ? themes.light : themes.dark,
});
