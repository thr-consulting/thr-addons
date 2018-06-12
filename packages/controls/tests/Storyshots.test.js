import initStoryshots from '@storybook/addon-storyshots';
import ShallowRenderer from 'react-test-renderer/shallow';

const shallowSnapshot = ({story, context}) => {
	expect(new ShallowRenderer().render(story.render(context))).toMatchSnapshot();
};

initStoryshots({
	test: shallowSnapshot,
});
