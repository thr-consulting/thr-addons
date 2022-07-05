import type {UseFormReturnType} from '@mantine/form/lib/use-form';
import debug from 'debug';
import {useState} from 'react';
import {Alert, List, LoadingOverlay} from '@mantine/core';
import {AlertCircle} from 'tabler-icons-react';
import type {ErrorMessages} from './errorMessages';
import {errorMessages} from './errorMessages';

const d = debug('thx.controls.inputs.TMForm');

export interface TMFormProps<T> {
	form: UseFormReturnType<T>;
	children?: React.ReactNode;
	onSubmit?: (values: T, event: React.FormEvent) => void | Promise<void>;
}

export function TMForm<T>(props: TMFormProps<T>) {
	const {onSubmit, form, children} = props;
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<ErrorMessages | null>(null);

	const alert = errors ? (
		<Alert icon={<AlertCircle size={16} />} title={errors.title} color="red" my="1em">
			<List>
				{errors.errors.map(msg => (
					<List.Item key={msg}>{msg}</List.Item>
				))}
			</List>
		</Alert>
	) : null;

	const load = <LoadingOverlay visible={loading} loaderProps={{variant: 'bars'}} />;

	return (
		<form
			onSubmit={ev => {
				form.onSubmit(values => {
					setErrors(null);
					if (onSubmit) {
						try {
							setLoading(true);
							const ret = onSubmit(values, ev);
							if (ret instanceof Promise) {
								ret
									.then(() => {
										setLoading(false);
									})
									.catch(err => {
										setLoading(false);
										setErrors(errorMessages(err));
									});
							} else {
								setLoading(false);
							}
						} catch (err) {
							setLoading(false);
							setErrors(errorMessages(err));
						}
					}
				})(ev);
			}}
		>
			{load}
			{children}
			{alert}
		</form>
	);
}
