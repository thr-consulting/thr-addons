import debug from 'debug';
import React from 'react';
import type {FormikValues} from 'formik';
import type {UseTFormReturn} from './types';
import {TFormConfig, useTForm} from './useTForm';

const d = debug('thx.controls.TForm');

export interface TFormProps<Values> extends TFormConfig<Values> {
	children?: ((props: UseTFormReturn<Values>) => React.ReactNode) | React.ReactNode;
}

const isEmptyChildren = (children: any): boolean => React.Children.count(children) === 0;

export function TForm<Values extends FormikValues = FormikValues>(props: TFormProps<Values>) {
	const tform = useTForm<Values>(props);
	const {children} = props;

	if (children) {
		if (typeof children === 'function') {
			return children(tform);
		}
		if (!isEmptyChildren(children)) {
			return React.Children.only(children);
		}
		return null;
	}
	return null;
}
