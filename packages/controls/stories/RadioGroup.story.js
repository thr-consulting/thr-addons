import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withState, Store} from '@thx/storybook-state';
import {Container, Form} from 'semantic-ui-react';
import RadioGroup from '../src/RadioGroup';

const stories = storiesOf('RadioGroup', module);

stories.addDecorator(withInfo);
stories.addDecorator(withState);

const storyFn = ({parameters: {state: {store}}}) => ( // eslint-disable-line react/prop-types
	<Container>
		<Form>
			<Form.Field width={6}>
				<label>Radio Group Control</label>
				<RadioGroup
					onChange={value => {
						store.set({value});
						action('onChange')(value);
					}}
					value={store.state.value}
					onBlur={action('onBlur')}
				>
					<Form.Radio value="a" label="Choice A"/>
					<Form.Radio value="b" label="Choice B"/>
				</RadioGroup>
			</Form.Field>
		</Form>
	</Container>
);

stories.add(
	'default',
	storyFn,
	{
		state: {store: new Store({value: 'a'})},
		info: {
			inline: true,
			text: 'Groups React Semantic UI Form.Radio elements into a single group',
			propTablesExclude: [Container, Form, Form.Field, Form.Radio],
		},
	},
);
