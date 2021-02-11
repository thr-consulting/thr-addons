import debug from 'debug';
import React from 'react';
import type {CellProps, Renderer} from 'react-table';

const d = debug('thx.controls.TableInput.HoverCell');

interface HoverCellOptions<D extends Record<string, unknown>> {
	Action: Renderer<CellProps<D>>;
}

export function HoverCell<D extends Record<string, unknown>>(options: HoverCellOptions<D>) {
	return function HoverCellFn(props: CellProps<D>) {
		// @ts-expect-error
		const isHover = props.hoverRow === props.row.id;
		const {Action} = options;
		// @ts-expect-error
		return <div style={{textAlign: 'right'}}>{isHover ? <Action {...props} /> : null}</div>;
	};
}
