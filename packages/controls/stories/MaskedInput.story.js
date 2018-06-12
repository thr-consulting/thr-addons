import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text} from '@storybook/addon-knobs/react';
import {Grid, Form} from 'semantic-ui-react';
import MaskedInput from '../src/MaskedInput';

const stories = storiesOf('MaskedInput', module);

stories.addDecorator(withKnobs);

stories.add('default', () => {
	const mask = text('Mask', 'A9A-9A9');

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={4}>
					<Form>
						<Form.Field>
							<label>Masked Input</label>
							<MaskedInput mask={{mask}} onChange={action('onChange')} onBlur={action('onBlur')}/>
						</Form.Field>
					</Form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
});
