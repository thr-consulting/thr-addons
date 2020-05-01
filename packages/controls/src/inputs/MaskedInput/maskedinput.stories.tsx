import debug from 'debug';
import React, {useState} from 'react';
import {Provider, themes, Button, Segment, Input, Form} from '@fluentui/react-northstar';
import {ArrowRightIcon} from '@fluentui/react-icons-northstar';
// import {Form, Container, Button, Segment, Input} from 'semantic-ui-react';
// import {InferType, object, string} from 'yup';
import {MaskedInput} from './MaskedInput';
// import {TForm, TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.MaskedInput.stories');

export default {title: 'MaskedInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [value, setValue] = useState<string>();
	const [mask, setMask] = useState<string | undefined>('99-999-99');
	const [maskTemp, setMaskTemp] = useState<string | undefined>('99-999-99');

	if (!shown) {
		return (
			<Provider theme={themes.teams}>
				<Button onClick={() => setShown(true)}>Show</Button>
			</Provider>
		);
	}

	return (
		<Provider theme={themes.teams}>
			<Segment>
				<Form>
					<Form.Field
						inline
						label="Masked Input"
						control={
							<MaskedInput
								mask={{
									mask,
									autoUnmask: true,
									showMaskOnHover: false,
								}}
								onChange={(v) => {
									d('onChange', v);
									setValue(v);
								}}
								onBlur={() => {
									d('onBlur');
								}}
								value={value}
							/>
						}
					/>
				</Form>
			</Segment>
			<Segment>
				<Input
					value={maskTemp}
					onChange={(ev, v) => setMaskTemp(v?.value)}
					icon={
						<ArrowRightIcon
							onClick={() => {
								setMask(maskTemp);
							}}
						/>
					}
				/>
			</Segment>
			<Segment>
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
		</Provider>
	);
};

// const formValidation = object().shape({
// 	text: string().required(),
// 	masked: string().required(),
// });
// type FormValidationType = InferType<typeof formValidation>;
//
// export const withTForm = () => (
// 	<Container>
// 		<TForm<FormValidationType> initialValues={{text: '', masked: ''}} validationSchema={formValidation} onSubmit={() => {}}>
// 			{(props: TFormChildrenProps<FormValidationType>) => {
// 				const {values, handleSubmit, handleChange, handleBlur, setFieldValue} = props;
//
// 				return (
// 					<Form onSubmit={handleSubmit}>
// 						<Form.Field width={6}>
// 							<label>Enter some text</label>
// 							<input name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
// 						</Form.Field>
// 						<Form.Field width={6}>
// 							<label>Enter some text</label>
// 							<Form.Input name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
// 						</Form.Field>
// 						<Form.Field width={6}>
// 							<label>Enter some text</label>
// 							<MaskedInput
// 								name="text"
// 								mask={{mask: '999-999'}}
// 								value={values.text}
// 								onChange={value => setFieldValue('text', value)}
// 								onBlur={handleBlur}
// 							/>
// 						</Form.Field>
// 						<Form.Button type="submit">Submit</Form.Button>
// 					</Form>
// 				);
// 			}}
// 		</TForm>
// 	</Container>
// );
