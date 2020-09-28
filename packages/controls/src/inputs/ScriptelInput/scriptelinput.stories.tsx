import debug from 'debug';
import React, {useState} from 'react';
import {Container, Form, Segment} from 'semantic-ui-react';
import {InferType, object} from 'yup';
import {Scriptel} from '../Scriptel';
import {ScriptelInput, ScriptelSignature} from './ScriptelInput';
import {TForm, TFormChildrenProps} from '../../form/TForm';
import {scriptelSchemaType} from '../../yupTypes';

const d = debug('thx.controls.ScriptelInput.stories');

export default {title: 'ScriptelInput'};

export const Main = () => {
	const [value, setValue] = useState<ScriptelSignature>();
	const [value2, setValue2] = useState<ScriptelSignature>();

	//  omniscriptUrl="ws://localhost:8080" imageType="image/png" crop scale={10}
	return (
		<Scriptel>
			<Container>
				<Segment basic>
					<ScriptelInput
						value={value}
						onChange={v => {
							d(v);
							setValue(v);
						}}
					/>
				</Segment>
				<Segment basic>
					<ScriptelInput
						value={value2}
						onChange={v => {
							d(v);
							setValue2(v);
						}}
					/>
				</Segment>
			</Container>
		</Scriptel>
	);
};

const formValidation = object().shape({
	sig: scriptelSchemaType().notRequired(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Scriptel>
		<Container>
			<TForm<FormValidationType> initialValues={{sig: undefined}} validationSchema={formValidation} onSubmit={() => {}}>
				{(props: TFormChildrenProps<FormValidationType>) => {
					const {values, handleSubmit, setFieldValue, hasErrors, hasWarnings, renderWarnings} = props;

					return (
						<Form onSubmit={handleSubmit} error={hasErrors} warning={hasWarnings}>
							<Form.Field width={6}>
								<label>Enter some text</label>
								<ScriptelInput value={values.sig} onChange={v => setFieldValue('sig', v)} />
							</Form.Field>
							<Form.Button type="submit">Submit</Form.Button>
							{renderWarnings()}
						</Form>
					);
				}}
			</TForm>
		</Container>
	</Scriptel>
);
