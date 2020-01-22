import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withState, Store} from '@thx/storybook-state';
import {action} from '@storybook/addon-actions';
import {Container, Form, Input, Button} from 'semantic-ui-react';
import {makeMoney} from '@thx/money';
import MoneyInput from '../src/money/MoneyInput';

const stories = storiesOf('MoneyInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withState);
stories.addDecorator(withKnobs);

const storyFn = ({parameters: {state: {store}}}) => ( // eslint-disable-line react/prop-types
	<Container>
		<Form>
			<Form.Field width={6}>
				<label>Enter amount</label>
				<MoneyInput
					onChange={value => {
						store.set({value});
						action('onChange')(value);
					}}
					value={store.state.value}
					placeholder="Enter money"
					onBlur={action('onBlur')}
					onDetailsClick={action('onDetailsClick')}
					locked={boolean('locked', false)}
				/>
			</Form.Field>
			<Button
				onClick={() => {
					store.set({value: makeMoney(3.56)});
				}}
			>
				Set to 3.56 CAD
			</Button>
			<Button
				onClick={() => {
					store.set({value: null});
				}}
			>
				Set to null
			</Button>
		</Form>
	</Container>
);

stories.add(
	'default',
	storyFn,
	{
		state: {store: new Store({value: null})},
		info: {
			inline: true,
			text: 'A masked money input. Defaults to CAD funds.',
			propTablesExclude: [Form, Form.Field, Container, Input],
		},
	},
);

stories.add(
	'non-null',
	storyFn,
	{
		state: {store: new Store({value: makeMoney(450, 'CAD')})},
		info: {
			inline: true,
			text: 'A masked money input. Defaults to CAD funds.',
			propTablesExclude: [Form, Form.Field, Container, Input],
		},
	},
);
