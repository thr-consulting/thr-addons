import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, object} from '@storybook/addon-knobs';
import {MessageComponent} from '../lib/Message';

const stories = storiesOf('Messages', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<div style={{width: '300px'}}>{story()}</div>
	));

stories.add('MessageComponent - Single', () => (
	<MessageComponent
		message={object('message', {
			id: '1',
			level: 'success',
			message: 'This is a message.',
			title: 'This is a title',
		})}
		clearMessage={action('clearMessage')}
	/>
));

stories.add('MessageComponent - Array', () => (
	<MessageComponent
		id="1"
		level={text('level', 'success')}
		message={object('message', {
			id: '1',
			level: 'success',
			message: [
				'This is the first message',
				'This is the second message',
				'This is the third message',
			],
			title: 'This is a title',
		})}
		clearMessage={action('clearMessage')}
	/>
));
