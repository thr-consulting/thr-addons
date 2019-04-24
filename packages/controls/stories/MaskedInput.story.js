import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, boolean, object} from '@storybook/addon-knobs';
import {Container, Form} from 'semantic-ui-react';
import MaskedInput from '../src/inputs/MaskedInput';

const stories = storiesOf('MaskedInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Masked Input</label>
				<MaskedInput
					mask={object('mask', {
						mask: '99-999-99',
						autoUnmask: true,
						showMaskOnHover: false,
					})}
					onChange={action('onChange')}
					onBlur={action('onBlur')}
					fluid={boolean('fluid', false)}
					type="string"
				/>
			</Form.Field>
		</Form>
	</Container>
);

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
