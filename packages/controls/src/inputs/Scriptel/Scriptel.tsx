import React, {useEffect, useRef, useState} from 'react';
import debug from 'debug';
import {ScriptelContext} from './ScriptelContext';
import {ScriptelSocket} from './scriptel';
import {ScriptelImageType, ScriptelPenStyle} from './scriptel/enums';
import {RenderedImage} from './scriptel/messages';

const d = debug('thx.controls.Scriptel');

export interface ScriptelProps {
	omniscriptUrl?: string; // Defaults to 'ws://localhost:8080'
	imageType?: ScriptelImageType; // Defaults to 'image/svg+xml'.
	scale?: number; // Defaults to 1
	crop?: boolean; // Defaults to false
	penStyle?: ScriptelPenStyle; // Defaults to 'PlainPenStyle'
	children: JSX.Element | JSX.Element[];
}

export function Scriptel(props: ScriptelProps) {
	const {omniscriptUrl, imageType, scale, crop, penStyle} = props;
	const socket = useRef<ScriptelSocket>();
	const [render, setRender] = useState<RenderedImage>();

	useEffect(() => {
		socket.current = new ScriptelSocket({
			omniscriptUrl,
			imageType,
			scale,
			crop,
			penStyle,
		});

		socket.current.on('render', msg => {
			setRender(msg);
		});
		socket.current.on('cancel', () => {
			d('Canceled');
		});

		return () => {
			if (socket.current) socket.current.close();
		};
	}, [omniscriptUrl, imageType, scale, crop, penStyle]);

	return <ScriptelContext.Provider value={render}>{props.children}</ScriptelContext.Provider>;
}
