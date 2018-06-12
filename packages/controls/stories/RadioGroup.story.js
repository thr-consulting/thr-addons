import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text} from '@storybook/addon-knobs/react';
import {withState} from '@dump247/storybook-state';
import {Grid, Form} from 'semantic-ui-react';
import RadioGroup from '../src/RadioGroup';

const stories = storiesOf('RadioGroup', module);

stories.addDecorator(withKnobs);

stories.add('default', withState({value: 'a'})(({store}) => {
	console.log(store.state);
	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={4}>
					<Form>
						<Form.Field>
							<label>Radio Group Control</label>
							<RadioGroup onChange={value => store.set({value})} value={store.state.value} onBlur={action('onBlur')}>
								<Form.Radio value="a" label="Choice A"/>
								<Form.Radio value="b" label="Choice B"/>
							</RadioGroup>
						</Form.Field>
					</Form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}));
