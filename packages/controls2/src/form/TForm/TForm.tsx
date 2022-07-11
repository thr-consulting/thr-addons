import debug from 'debug';
import {FormikValues, isFunction, FormikProvider, isEmptyChildren} from 'formik';
import {useImperativeHandle, Children, createElement} from 'react';
import type {ReactNode} from 'react';
import type {TFormConfig, TFormProps} from './types';
import {useTForm} from './useTForm';

const d = debug('thx.controls2.form.TForm');

export function TForm<Values extends FormikValues = FormikValues>(props: TFormConfig<Values>) {
	const tbag = useTForm<Values>(props);
	const {component, render, children, innerRef} = props;

	// This allows folks to pass a ref to <Formik />
	useImperativeHandle(innerRef, () => tbag);

	let child = null;
	if (component) {
		// @ts-ignore
		child = createElement(component, tbag);
	} else if (render) {
		child = render(tbag);
	} else if (children) {
		if (isFunction(children)) {
			child = (children as (bag: TFormProps<Values>) => ReactNode)(tbag as TFormProps<Values>);
		} else if (!isEmptyChildren(children)) {
			child = Children.only(children);
		}
	}

	return <FormikProvider value={tbag}>{child}</FormikProvider>;
}
