import type {Meta} from '@storybook/react';
import debug from 'debug';
import {storyDecorator} from '../../storyDecorator';

export {Main} from './main.story';
export {WithHover} from './withHover.story';

const d = debug('thx.controls.inputs.TableInput.tableinput.stories');

export default {
	title: 'Inputs/TableInput',
	decorators: [storyDecorator],
} as Meta;
