import React, {MutableRefObject} from 'react';
import type {RenderedImage} from './scriptel/messages';
import type {ScriptelSocket} from './scriptel';

export const ScriptelContext = React.createContext<
	{socket: MutableRefObject<ScriptelSocket | undefined>; renderImage: RenderedImage | undefined} | undefined
>(undefined);
