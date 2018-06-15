import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text} from '@storybook/addon-knobs/react';
import {Container, Form} from 'semantic-ui-react';
import MaskedInput from '../src/MaskedInput';

const stories = storiesOf('MaskedInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

const storyFn = () => {
	const mask = text('Mask', 'A9A-9A9');

	return (
		<Container>
			<Form width={6}>
				<Form.Field>
					<label>Masked Input</label>
					<MaskedInput mask={{mask}} onChange={action('onChange')} onBlur={action('onBlur')}/>
				</Form.Field>
			</Form>
		</Container>
	);
};

stories.add(
	'default',
	storyFn,
	{
		info: {
			inline: true,
			text: 'A masked text input',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
