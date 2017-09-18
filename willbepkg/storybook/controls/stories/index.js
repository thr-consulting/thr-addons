import 'babel-polyfill';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, boolean, text, object} from '@storybook/addon-knobs';
import {Form} from 'semantic-ui-react';
import {MaskedInput, RadioGroup, ResponsiveMenu, SinEntry} from '../lib';

const stories = storiesOf('Controls', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<div style={{width: '300px'}}>{story()}</div>
	));

stories.add('MaskedInput', () => (
	<MaskedInput
		onChange={action('onChange')}
		fluid={boolean('fluid', false)}
		emptyValue={text('emptyValue', null)}
		mask={object('mask', {
			mask: '99-999-99',
			autoUnmask: true,
			showMaskOnHover: false,
		})}

	/>
));

stories.add('RadioGroup', () => (
	<Form>
		<Form.Field>
			<RadioGroup grouped>
				<Form.Radio label="Option 1" value="1"/>
				<Form.Radio label="Option 2" value="2"/>
			</RadioGroup>
		</Form.Field>
	</Form>
));

stories.add('ResponsiveMenu', () => (
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
));

stories.add('SinEntry', () => (
	<div>
		<p>Sample: 046 454 286</p>
		<SinEntry
			onChange={action('onChange')}
		/>
	</div>
));

stories.add('SinEntry - Entered', () => (
	<div>
		<SinEntry
			onChange={action('onChange')}
			value={text('value', '046454286')}
		/>
	</div>
));
