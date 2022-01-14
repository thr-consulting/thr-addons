import debug from 'debug';
import type {CellProps, Renderer} from 'react-table';

const d = debug('thx.controls.inputs.TableInput.HoverCell');

interface HoverCellOptions<D extends Record<string, unknown>> {
	Action: Renderer<CellProps<D>>;
}

export function HoverCell<D extends Record<string, unknown>>(options: HoverCellOptions<D>) {
	return function HoverCellFn(props: CellProps<D>) {
		const {Action} = options;

		// @ts-expect-error
		if (props.hoverRow === props.row.id) {
			return (
				<div style={{textAlign: 'right'}}>
					{/* @ts-expect-error */}
					<Action {...props} />
				</div>
			);
		}
		return null;
	};
}
