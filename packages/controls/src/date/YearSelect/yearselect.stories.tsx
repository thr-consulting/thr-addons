import debug from 'debug';
import React, {useState} from 'react';
import {Container, Form, Grid, Segment} from 'semantic-ui-react';
import {InferType, number, object} from 'yup';
import {YearSelect} from './YearSelect';
import {TForm} from '../../form/TForm';

const d = debug('thx.controls.YearSelect.stories');

export default {title: 'Date/YearSelect'};

export const Main = () => {
	const [value1, setValue1] = useState(new Date().getFullYear());
	const [value2, setValue2] = useState(new Date().getFullYear());
	const [value3, setValue3] = useState(1990);

	return (
		<Container>
			<Segment basic>
				<Grid columns="equal">
					<Grid.Row>
						<Grid.Column>
							<YearSelect
								value={value1}
								onChange={v => {
									setValue1(v);
								}}
								onBlur={() => {
									d('Blur yearselect');
								}}
							/>
						</Grid.Column>
						<Grid.Column>
							<YearSelect
								value={value2}
								onChange={v => {
									setValue2(v);
								}}
								error
							/>
						</Grid.Column>
						<Grid.Column>
							<YearSelect
								value={value3}
								onChange={v => {
									setValue3(v);
								}}
								minYear={1980}
								maxYear={1990}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	year: number().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{year: 0}} validationSchema={formValidation} onSubmit={() => {}}>
			{props => {
				const {values, handleSubmit, setFieldValue, setFieldTouched} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<YearSelect value={values.year} onChange={v => setFieldValue('year', v)} onBlur={() => setFieldTouched('year')} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
