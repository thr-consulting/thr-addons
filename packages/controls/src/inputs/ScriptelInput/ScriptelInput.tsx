import type {ScriptelSchemaType} from '@thx/yup-types';
import debug from 'debug';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Image} from 'semantic-ui-react';
import {ScriptelContext} from '../Scriptel/ScriptelContext';

const d = debug('thx.controls.inputs.ScriptelInput');

export interface ScriptelInputProps {
	value?: ScriptelSchemaType;
	onChange?: (value?: ScriptelSchemaType) => void;
	buttonText?: string;
}

export function ScriptelInput(props: ScriptelInputProps) {
	const {value, onChange, buttonText = 'Enter Signature'} = props;
	const ctx = useContext(ScriptelContext);

	const [enterSignature, setEnterSignature] = useState(false);

	useEffect(() => {
		if (enterSignature) {
			if (onChange && ctx?.renderImage) {
				setEnterSignature(false);
				if (ctx.renderImage.type === 'image/svg+xml' || ctx.renderImage.type === 'image/png') {
					onChange({
						type: ctx.renderImage.type,
						width: ctx.renderImage.width,
						height: ctx.renderImage.height,
						timestamp: new Date(),
						data: ctx.renderImage.data,
					});
				}
			}
			if (onChange && !ctx) {
				onChange();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ctx]);

	if (enterSignature) {
		return (
			<div>
				<div>{ctx?.isSigning ? 'signing...' : 'Enter a signature and click OK.'}</div>
				<Button
					onClick={() => {
						setEnterSignature(false);
					}}
					color="black"
					loading={ctx?.loading}
					disabled={ctx?.loading}
				>
					Cancel
				</Button>
				<Button size="mini" as="a" basic onClick={() => ctx?.socket.current?.calibrate()} disabled={ctx?.loading}>
					Calibrate
				</Button>
			</div>
		);
	}

	if (value && value.data) {
		return (
			<div>
				<Image size="medium" src={value.data} bordered />
				<Button
					size="mini"
					compact
					onClick={() => {
						setEnterSignature(false);
						if (onChange) onChange();
					}}
				>
					Reset
				</Button>
			</div>
		);
	}

	return <Button onClick={() => setEnterSignature(true)}>{buttonText}</Button>;
}
