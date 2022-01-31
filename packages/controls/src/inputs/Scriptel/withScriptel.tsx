import React from 'react';
import {Scriptel, ScriptelProps} from './Scriptel';

/**
 * A HoC that provides a connection to a Scriptel Omniscript device.
 * You can only have a single connection open at a time.
 * @param WrappedComponent
 * @return {Object}
 */
export function withScriptel(WrappedComponent: any, scriptelProps: ScriptelProps) {
	return (props: any) => (
		<Scriptel {...scriptelProps}>
			<WrappedComponent {...props} />
		</Scriptel>
	);
}
