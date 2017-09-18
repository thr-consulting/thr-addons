// @flow

import React from 'react';
import {Dimmer, Loader, Segment} from 'semantic-ui-react';

export default function Loading() {
	return (
		<Segment basic>
			<Dimmer active inverted>
				<Loader/>
			</Dimmer>
		</Segment>
	);
}
