import debug from 'debug';
import {useEffect, useMemo, useRef, useState} from 'react';
import {ScriptelContext} from './ScriptelContext';
import {ScriptelSocket} from './scriptel';
import type {ScriptelPenStyle} from './scriptel/enums';
import type {RenderedImage} from './scriptel/messages';

const d = debug('thx.controls2.inputs.Scriptel');

export interface ScriptelProps {
	omniscriptUrl?: string; // Defaults to 'ws://localhost:8080'
	imageType?: string; // Defaults to 'image/svg+xml'.
	scale?: number; // Defaults to 1
	crop?: boolean; // Defaults to false
	penStyle?: ScriptelPenStyle; // Defaults to 'PlainPenStyle'
	children: JSX.Element | JSX.Element[];
}

export function Scriptel({omniscriptUrl, imageType, scale, crop, penStyle, children}: ScriptelProps) {
	const socket = useRef<ScriptelSocket>();
	const [render, setRender] = useState<RenderedImage>();
	const [loading, setLoading] = useState<boolean>(false);
	const [isSigning, setIsSigning] = useState<boolean>(false);

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
			setLoading(false);
			setRender(undefined); // todo look at this in future
		});
		socket.current.on('okButtonDown', () => {
			setLoading(true);
		});
		socket.current.on('cancel', () => {
			setLoading(false);
			setRender(undefined);
		});
		socket.current.on('penMove', () => {
			setIsSigning(true);
		});
		socket.current.on('penUp', () => {
			setIsSigning(false);
		});

		return () => {
			if (socket.current) socket.current.close();
		};
	}, [omniscriptUrl, imageType, scale, crop, penStyle]);

	const scriptel = useMemo(() => {
		return {socket, renderImage: render, loading, isSigning};
	}, [isSigning, loading, render]);

	return <ScriptelContext.Provider value={scriptel}>{children}</ScriptelContext.Provider>;
}
