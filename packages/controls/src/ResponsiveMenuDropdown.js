// @flow

import React, {Children} from 'react';
import type {ChildrenArray} from 'react';
import {Dropdown} from 'semantic-ui-react';

type Props = {
	isMobile?: boolean,
	children?: ChildrenArray<*>,
	icon?: string,
	text?: string,
};

export default function ResponsiveMenuDropdown({children, isMobile, icon, text}: Props) {
	return (
		<Dropdown item text={text} icon={isMobile ? icon : 'dropdown'}>
			<Dropdown.Menu>
				{Children.map(children, el => React.cloneElement(el, {
					menuComponent: Dropdown.Item,
				}))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

ResponsiveMenuDropdown.defaultProps = {
	isMobile: false,
};
