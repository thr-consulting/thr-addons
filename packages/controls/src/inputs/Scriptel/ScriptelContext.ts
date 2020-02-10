/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import React, {MutableRefObject} from 'react';
import {RenderedImage} from './scriptel/messages';

export const ScriptelContext = React.createContext<RenderedImage | undefined>(undefined);
