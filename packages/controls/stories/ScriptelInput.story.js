import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withState, Store} from '@thx/storybook-state';
import {Container, Form, Input} from 'semantic-ui-react';
import Scriptel from '../src/inputs/Scriptel/Scriptel';
import ScriptelInput from '../src/inputs/ScriptelInput/ScriptelInput';

const stories = storiesOf('ScriptelInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withState);

function StoryComponent(props) {
	const {store} = props;
	return (
		<Container>
			<Form>
				<Form.Field width={6}>
					<label>Test</label>
					<Input/>
				</Form.Field>
				<Form.Field width={6}>
					<label>Signature</label>
					<ScriptelInput
						onChange={value => {
							action('onChange')(value);
							store.set({signature: value});
						}}
						value={store.state.signature}
					/>
				</Form.Field>
				<Form.Field width={6}>
					<label>Test</label>
					<Input/>
				</Form.Field>
			</Form>
		</Container>
	);
}
const storyFn = ({parameters: {state: {store}}}) => (
	<Scriptel
		omniscript="ws://localhost:8080"
		imageType="image/png"
	>
		<StoryComponent store={store}/>
	</Scriptel>
); // eslint-disable-line react/prop-types

stories.add(
	'default',
	storyFn,
	{
		state: {store: new Store({signature: null})},
		info: {
			inline: true,
			text: 'A signature entry input using Scriptel Omniscript.',
			propTablesExclude: [Form, Form.Field, Container, Input],
		},
	},
);
