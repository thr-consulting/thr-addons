// @flow

import React from 'react';
import Bundle from './Bundle';
import Loading from './Loading';

export default function lazy(component: any) {
	return (props: any) => (
		<Bundle load={component}>
			{Comp => (Comp ? <Comp {...props}/> : <Loading/>)}
		</Bundle>
	);
}
