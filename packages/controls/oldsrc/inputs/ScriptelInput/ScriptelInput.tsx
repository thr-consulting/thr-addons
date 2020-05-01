import React, {useContext, useEffect, useState} from 'react';
import {Button, Image, Label} from 'semantic-ui-react';
import debug from 'debug';
import type {InferType} from 'yup';
import {ScriptelContext} from '../Scriptel/ScriptelContext';
import {scriptelSchemaType} from '../../yupTypes';

const d = debug('thx.controls.ScriptelInput');

const schemaType = scriptelSchemaType();
export type ScriptelSignature = InferType<typeof schemaType>;

export interface ScriptelInputProps {
	value?: ScriptelSignature;
	onChange?: (value?: ScriptelSignature) => void;
}

export function ScriptelInput(props: ScriptelInputProps) {
	const {value, onChange} = props;
	const ctx = useContext(ScriptelContext);

	const [entering, setEntering] = useState(false);

	useEffect(() => {
		if (entering) {
			setEntering(false);
			if (onChange && ctx?.renderImage) {
				onChange({
					type: ctx.renderImage.type,
					width: ctx.renderImage.width,
					height: ctx.renderImage.height,
					data: ctx.renderImage.data,
				});
			}
			if (onChange && !ctx) {
				onChange();
			}
		}
	}, [ctx]);

	if (entering) {
		return (
			<div>
				<div>Enter a signature and click OK.</div>
				<Button onClick={() => setEntering(false)} color="black">
					Cancel
				</Button>
				<Label as="a" basic onClick={() => ctx?.socket.current?.calibrate()}>
					Calibrate
				</Label>
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
						setEntering(false);
						if (onChange) onChange();
					}}
				>
					Reset
				</Button>
			</div>
		);
	}

	return <Button onClick={() => setEntering(true)}>Enter Signature</Button>;
}
