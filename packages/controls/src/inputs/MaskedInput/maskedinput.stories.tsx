import debug from 'debug';
import React, {useState} from 'react';
import {Form, Container, Button, Segment, Input} from 'semantic-ui-react';
import {InferType, object, string} from 'yup';
import {MaskedInput} from './MaskedInput';
import {TForm, TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.MaskedInput.stories');

export default {title: 'MaskedInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [value, setValue] = useState<string | number>();
	const [mask, setMask] = useState('99-999-99');
	const [maskTemp, setMaskTemp] = useState('99-999-99');

	if (!shown) {
		return (
			<Container>
				<Button onClick={() => setShown(true)}>Show</Button>
			</Container>
		);
	}

	return (
		<Container>
			<Segment basic>
				<Form>
					<Form.Field inline width={6}>
						<label>Masked Input</label>
						<MaskedInput
							mask={{
								mask,
								autoUnmask: true,
								showMaskOnHover: false,
							}}
							onChange={v => {
								d('onChange', v);
								setValue(v);
							}}
							onBlur={() => {
								d('onBlur');
							}}
							value={value}
						/>
					</Form.Field>
				</Form>
			</Segment>
			<Segment basic>
				<Input
					action={{
						content: 'Set Mask',
						onClick: () => {
							setMask(maskTemp);
						},
					}}
					value={maskTemp}
					onChange={v => setMaskTemp(v.currentTarget.value)}
				/>
			</Segment>
			<Segment basic>
				<Button
					onClick={() => {
						setValue('8811245');
					}}
				>
					Set value
				</Button>
				<Button onClick={() => setShown(false)}>Hide</Button>
			</Segment>
			<Segment>Value is: {value}</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	text: string().required(),
	masked: string().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{text: '', masked: ''}} validationSchema={formValidation} onSubmit={() => {}}>
			{(props: TFormChildrenProps<FormValidationType>) => {
				const {values, handleSubmit, handleChange, handleBlur, setFieldValue} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some text</label>
							<input name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
						</Form.Field>
						<Form.Field width={6}>
							<label>Enter some text</label>
							<Form.Input name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
						</Form.Field>
						<Form.Field width={6}>
							<label>Enter some text</label>
							<MaskedInput
								name="text"
								mask={{mask: '999-999'}}
								value={values.text}
								onChange={value => setFieldValue('text', value)}
								onBlur={handleBlur}
							/>
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);

const withTypeNumberFormValidation = object().shape({
	masked: string().required(),
});
type withTypeNumberFormValidationType = InferType<typeof withTypeNumberFormValidation>;

export const WithTypeNumber = () => (
	<Container>
		<TForm<withTypeNumberFormValidationType> initialValues={{masked: ''}} validationSchema={withTypeNumberFormValidation} onSubmit={() => {}}>
			{({
				values,
				handleSubmit,
				handleBlur,
				setFieldValue,
				renderWarnings,
				hasWarnings,
				hasErrors,
			}: TFormChildrenProps<withTypeNumberFormValidationType>) => {
				return (
					<Form onSubmit={handleSubmit} error={hasErrors} warning={hasWarnings}>
						<Form.Field width={6}>
							<label>typeof text: {typeof values.masked}</label>
							<label>Enter some text</label>
							<MaskedInput
								name="masked"
								mask={{mask: '9999'}}
								value={values.masked}
								onChange={value => setFieldValue('masked', value)}
								onBlur={handleBlur}
								type="number"
							/>
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
						{renderWarnings()}
					</Form>
				);
			}}
		</TForm>
	</Container>
);
