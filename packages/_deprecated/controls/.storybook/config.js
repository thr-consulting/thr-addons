import {configure} from '@storybook/react';
// import {setConfig} from 'react-hot-loader';
//
// setConfig({pureSFC: true});

function loadStories() {
	const req = require.context('../stories', true, /\.story\.js$/);
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
