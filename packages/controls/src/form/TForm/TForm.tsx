import debug from 'debug';
import {FormikValues, isFunction, FormikProvider, isEmptyChildren} from 'formik';
import React from 'react';
import type {TFormConfig, TFormProps} from './types';
import {useTForm} from './useTForm';

const d = debug('thx.controls.form.TForm');

export function TForm<Values extends FormikValues = FormikValues>(props: TFormConfig<Values>) {
	const tbag = useTForm<Values>(props);
	const {component, render, children, innerRef} = props;

	// This allows folks to pass a ref to <Formik />
	React.useImperativeHandle(innerRef, () => tbag);

	let child = null;
	if (component) {
		// @ts-ignore
		child = React.createElement(component, tbag);
	} else if (render) {
		child = render(tbag);
	} else if (children) {
		if (isFunction(children)) {
			child = (children as (bag: TFormProps<Values>) => React.ReactNode)(tbag as TFormProps<Values>);
		} else if (!isEmptyChildren(children)) {
			child = React.Children.only(children);
		}
	}

	return <FormikProvider value={tbag}>{child}</FormikProvider>;
}
