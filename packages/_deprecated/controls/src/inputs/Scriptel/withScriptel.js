import React from 'react';
import Scriptel from './Scriptel';

/**
 * A HoC that provides a connection to a Scriptel Omniscript device.
 * You can only have a single connection open at a time.
 * @param WrappedComponent
 * @return {Object}
 */
export default function withScriptel(WrappedComponent, opts) {
	return props => (
		<Scriptel options={opts}>
			<WrappedComponent {...props}/>
		</Scriptel>
	);
}
