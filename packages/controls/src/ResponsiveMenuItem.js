// @flow

import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';

type Props = {
	text?: string,
	icon?: string,
	menuComponent?: any,
};

export default function ResponsiveMenuItem({text, icon, menuComponent, ...rest}: Props) {
	const MenuComponent = menuComponent || Menu.Item;
	return (
		<MenuComponent {...rest}>
			<Icon name={icon}/>
			{text}
		</MenuComponent>
	);
}
