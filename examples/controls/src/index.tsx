import {render} from 'react-dom';
import {DemoLocalDatePicker} from './DemoLocalDatePicker';

const domContainer = document.querySelector('#root');
render(
	<div>
		<DemoLocalDatePicker />
	</div>,
	domContainer,
);
