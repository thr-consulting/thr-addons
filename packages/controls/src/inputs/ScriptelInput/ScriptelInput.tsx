import React, {useContext, useEffect, useState} from 'react';
import {Button, Image} from 'semantic-ui-react';
import debug from 'debug';
import {ScriptelContext} from '../Scriptel/ScriptelContext';
import {ScriptelImageType} from '../Scriptel';

const d = debug('thx.controls.ScriptelInput');

export interface ScriptelInputProps {
	value?: {
		width?: number;
		height?: number;
		data: string;
		type?: ScriptelImageType;
	};
	onChange?: (value?: {width: number; height: number; data: string; type: ScriptelImageType}) => void;
}

export function ScriptelInput(props: ScriptelInputProps) {
	const {value, onChange} = props;
	const ctx = useContext(ScriptelContext);

	const [entering, setEntering] = useState(false);

	useEffect(() => {
		if (entering) {
			setEntering(false);
			if (onChange && ctx) {
				onChange({
					type: ctx.type,
					width: ctx.width,
					height: ctx.height,
					data: ctx.data,
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
