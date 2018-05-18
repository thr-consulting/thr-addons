// @flow

import React, {Children} from 'react';
import type {ChildrenArray} from 'react';
import MediaQuery from 'react-responsive';
import {Menu} from 'semantic-ui-react';
import ResponsiveMenuItem from './ResponsiveMenuItem';
import ResponsiveMenuDropdown from './ResponsiveMenuDropdown';

type Props = {
	children: ChildrenArray<*>,
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
				<Menu {...rest}>
					{children}
				</Menu>
			</MediaQuery>
			<MediaQuery query={maxQuery}>
				<Menu icon {...rest}>
					{Children.map(children, el => React.cloneElement(el, {
						isMobile: true,
					}))}
				</Menu>
			</MediaQuery>
		</div>
	);
}

ResponsiveMenu.defaultProps = {
	mobileWidth: 768,
};

ResponsiveMenu.Item = ResponsiveMenuItem;
ResponsiveMenu.Dropdown = ResponsiveMenuDropdown;
