import React, {MutableRefObject} from 'react';
import {RenderedImage} from './scriptel/messages';
import {ScriptelSocket} from './scriptel';

export const ScriptelContext = React.createContext<{socket: MutableRefObject<ScriptelSocket | undefined>; renderImage: RenderedImage | undefined} | undefined>(undefined);
