// @flow

import React from 'react';
import type {ChildrenArray} from 'react';
import MediaQuery from 'react-responsive';
import {Menu} from 'semantic-ui-react';
import ResponsiveMenuItem from '../ResponsiveMenuItem';
import ResponsiveMenuDropdown from '../ResponsiveMenuDropdown';
import {ResponsiveMenuContext} from '../ResponsiveMenuContext';

type Props = {
	children: ChildrenArray<*>,
	/** The number of pixels wide the mobile screen should be. */
	mobileWidth?: number,
};

/**
 * Displays a mobile responsive menu
 * @class
 * @property {number} mobileWidth - The number of pixels defining mobile cutoff
 * @property {Component[]} children - ResponsiveMenu.Item or ResponsiveMenu.Dropdown
 */
export default function ResponsiveMenu({mobileWidth, children, ...rest}: Props) {
	const minQuery = `(min-width: ${mobileWidth + 1}px)`;
	const maxQuery = `(max-width: ${mobileWidth}px)`;
	return (
		<div>
			<MediaQuery query={minQuery}>
				<ResponsiveMenuContext.Provider value={{isMobile: false}}>
					<Menu {...rest}>
						{children}
					</Menu>
				</ResponsiveMenuContext.Provider>
			</MediaQuery>
			<MediaQuery query={maxQuery}>
				<ResponsiveMenuContext.Provider value={{isMobile: true}}>
					<Menu icon {...rest}>
						{children}
					</Menu>
				</ResponsiveMenuContext.Provider>
			</MediaQuery>
		</div>
	);
}

ResponsiveMenu.defaultProps = {
	mobileWidth: 768,
};

ResponsiveMenu.Item = ResponsiveMenuItem;
ResponsiveMenu.Dropdown = ResponsiveMenuDropdown;
