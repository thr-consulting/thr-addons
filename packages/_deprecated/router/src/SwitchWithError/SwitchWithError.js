import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../NotFound';

// type Props = {
// 	children: ChildrenArray<*>,
// };

export default function SwitchWithError(props) {
	return (
		<Switch>
			{props.children}
			<Route component={NotFound}/>
		</Switch>
	);
}
