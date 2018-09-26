import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import ResponsiveMenu from '../src/menu/ResponsiveMenu';

const stories = storiesOf('ResponsiveMenu', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<ResponsiveMenu vertical>
		<ResponsiveMenu.Item as="a" text="Home" icon="home"/>
		<ResponsiveMenu.Item text="Home" icon="home"/>
		<ResponsiveMenu.Item text="Home" icon="home"/>
		<ResponsiveMenu.Item text="Home" icon="home"/>
		<ResponsiveMenu.Dropdown text="More Home" icon="dollar">
			<ResponsiveMenu.Item text="Home" icon="home"/>
			<ResponsiveMenu.Item text="Home" icon="home"/>
		</ResponsiveMenu.Dropdown>
	</ResponsiveMenu>
);

stories.add(
	'default',
	storyFn,
	{
		info: {
			inline: true,
			text: 'Displays a mobile responsive menu',
		},
	},
);
