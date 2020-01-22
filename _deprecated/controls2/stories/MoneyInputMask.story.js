import React from 'react';
import {storiesOf} from '@storybook/react';
import {Grid, Form} from 'semantic-ui-react';
import Money from 'js-money';
import MoneyInputMask from '../src/money/MoneyInputMask';

storiesOf('MoneyInputMask', module)
	.add('default', () => (
		<Grid>
			<Grid.Row>
				<Grid.Column width={4}>
					<Form>
						<Form.Field>
							<label>Money</label>
							<MoneyInputMask value={Money.fromDecimal(45664.32, Money.CAD)}/>
						</Form.Field>
					</Form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	));
