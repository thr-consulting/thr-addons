// @flow

import React from 'react';
import type {ChildrenArray} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {ResponsiveMenuContext, ResponsiveMenuDropdownContext} from '../ResponsiveMenuContext';

type Props = {
	children?: ChildrenArray<*>,
	/** A Semantic UI icon name. If in mobile mode, will show the supplied icon, otherwise it will show an arrow. */
	icon?: string,
	/** The text label to show on the menu. */
	text?: string,
};

export default function ResponsiveMenuDropdown({children, icon, text}: Props) {
	return (
		<ResponsiveMenuContext.Consumer>
			{({isMobile}) => (
				<Dropdown item text={text} icon={isMobile ? icon : 'dropdown'}>
					<Dropdown.Menu>
						<ResponsiveMenuDropdownContext.Provider value={{menuComponent: Dropdown.Item}}>
							{children}
						</ResponsiveMenuDropdownContext.Provider>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</ResponsiveMenuContext.Consumer>
	);
}
