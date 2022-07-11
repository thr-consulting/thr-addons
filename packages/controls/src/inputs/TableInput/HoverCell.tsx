import debug from 'debug';
import type {CellProps, Renderer} from 'react-table';

const d = debug('thx.controls.inputs.TableInput.HoverCell');

interface HoverCellOptions<D extends Record<string, unknown>> {
	action: Renderer<CellProps<D>>;
}

export function HoverCell<D extends Record<string, unknown>>(options: HoverCellOptions<D>) {
	return function HoverCellFn(props: CellProps<D>) {
		// const {Action} = options;
		const {action} = options;

		// @ts-expect-error
		if (props.hoverRow === props.row.id) {
			d(props);
			return (
				<div style={{textAlign: 'right'}}>
					{/* <Action {...props} /> */}
					{action}
				</div>
			);
		}
		return null;
	};
}
