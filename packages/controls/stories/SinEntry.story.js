import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withState, Store} from '@thx/storybook-state';
import {Form, Container} from 'semantic-ui-react';
import SinEntry from '../src/inputs/SinEntry';

const stories = storiesOf('SinEntry', module);

stories.addDecorator(withInfo);
stories.addDecorator(withState);

const storyFn = ctx => {
	const {parameters: {state: {store}}} = ctx;

	return ( // eslint-disable-line react/prop-types
		<Container>
			<Form>
				<Form.Field width={6}>
					<label>SIN</label>
					<SinEntry
						onChange={value => {
							action('onChange')(value);
							store.set({value});
						}}
						onSinChange={sin => {
							action('onSinChange')(sin);
							store.set({sin});
						}}
						value={store.state.value}
						onBlur={action('onBlur')}
					/>
				</Form.Field>
				<p>
					Use this sample SIN to pass validation: 944-573-997
				</p>
			</Form>
		</Container>
	);
};

stories.add(
	'default',
	storyFn,
	{
		state: {
			store: new Store({
				value: false,
				sin: '',
			}),
		},
		info: {
			inline: true,
			text: 'A SIN entry control',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
