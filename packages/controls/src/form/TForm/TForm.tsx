import debug from 'debug';
import React from 'react';
import {Formik, FormikConfig, FormikValues} from 'formik';
import {TFormInner, TFormProps} from './TFormInner';

const d = debug('thx.controls.TForm');

export default function TForm<Values extends FormikValues = FormikValues>(
	props: FormikConfig<Values> & TFormProps<Values>,
) {
	return (
		<Formik<Values> {...props}>
			{formikProps => {
				return <TFormInner<Values> formikProps={formikProps} tFormProps={props} children={props.children} />;
			}}
		</Formik>
	);
}
