import {IMaskedTextFieldProps, MaskedTextField} from '@fluentui/react';
import debug from 'debug';
import React from 'react';

const d = debug('thx.controls-fluentui.inputs.MaskedInput');

// '9': [0-9] 'a': [a-zA-Z] '*': [a-zA-Z0-9]

export function MaskedInput(props: IMaskedTextFieldProps) {
	const {onChange, mask, maskChar, ...rest} = props;
	d(mask, maskChar);
	return (
        <MaskedTextField
			underlined={false}
			maskChar={maskChar}
			onChange={(ev, value) => {
				if (onChange) onChange(ev, value?.replace(/_/g, ''));
			}}
			{...rest}
		/>
    );
}
