import React, {MutableRefObject} from 'react';
import type {ScriptelSocket} from './scriptel';
import type {RenderedImage} from './scriptel/messages';

export const ScriptelContext = React.createContext<
	{socket: MutableRefObject<ScriptelSocket | undefined>; renderImage: RenderedImage | undefined; loading: boolean; isSigning: boolean} | undefined
>(undefined);
