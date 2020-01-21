import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import {ResponsiveMenuDropdownContext} from '../ResponsiveMenuContext';

// type Props = {
// 	/** The text label to show on the menu item. */
// 	text?: string,
// 	/** A Semantic UI icon name. */
// 	icon?: string,
// 	/** Defaults to Semantic UI Menu.Item unless this item is a descendant of a ResponsiveMenuDropdown. */
// 	menuComponent?: any,
// };

export default function ResponsiveMenuItem({text, icon, menuComponent, ...rest}) {
	return (
		<ResponsiveMenuDropdownContext.Consumer>
			{({menuComponent: mc}) => {
				const MenuComponent = mc || menuComponent || Menu.Item;
				return (
					<MenuComponent {...rest}>
						<Icon name={icon}/>
						{text}
					</MenuComponent>
				);
			}}
		</ResponsiveMenuDropdownContext.Consumer>
	);
}
