import debug from 'debug';
import {FieldArray, FieldArrayRenderProps} from 'formik';
/* eslint-disable react/jsx-key */
import React, {useMemo, useState} from 'react';
import {
	CellPropGetter,
	CellProps,
	Column,
	FooterGroupPropGetter,
	FooterPropGetter,
	HeaderGroupPropGetter,
	HeaderPropGetter,
	RowPropGetter,
	TableBodyPropGetter,
	useTable,
} from 'react-table';
import {Table, TableProps} from 'semantic-ui-react';

const d = debug('thx.controls.inputs.TableInput');

type DefaultTableType = Record<string, unknown>;

interface TableInputProps<A extends DefaultTableType> {
	name: string;
	values: A[];
	columns: Column<A>[];
	setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
	createRow: () => A;
	tableProps?: TableProps;
	headerRowProps?: HeaderGroupPropGetter<A>;
	headerCellProps?: HeaderPropGetter<A>;
	footerRowProps?: FooterGroupPropGetter<A>;
	footerCellProps?: FooterPropGetter<A>;
	bodyProps?: TableBodyPropGetter<A>;
	rowProps?: RowPropGetter<A>;
	cellProps?: CellPropGetter<A>;
}

interface TableInputTableProps<A extends DefaultTableType> extends TableInputProps<A> {
	arrayHelpers: FieldArrayRenderProps;
}

export interface TableCellProps<D extends DefaultTableType, V = any> extends CellProps<D, V> {
	arrayHelpers: FieldArrayRenderProps;
	addRow: () => void;
	updateData: (index: number, id: string, value: V) => void;
}

function TableInputTable<A extends DefaultTableType>(props: TableInputTableProps<A>) {
	const {
		name,
		columns,
		values,
		arrayHelpers,
		setFieldValue,
		createRow,
		tableProps,
		headerRowProps,
		headerCellProps,
		bodyProps,
		rowProps,
		cellProps,
		footerCellProps,
		footerRowProps,
	} = props;
	const cols = useMemo(() => columns, [columns]);
	const vals = useMemo(() => values, [values]);
	const [hoverRow, setHoverRow] = useState('');

	// React-Table hook
	const {getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, footerGroups} = useTable<A>({
		columns: cols,
		data: vals,
		// @ts-ignore
		updateData(rowIndex, columnId, value) {
			setFieldValue(`${name}[${rowIndex}].${columnId}`, value);
		},
		addRow() {
			arrayHelpers.push(createRow());
		},
		arrayHelpers,
	});

	// @ts-ignore Check for the existence of a Footer that is not the default emptyRenderer()
	const hasFooter = footerGroups.some(fg => fg.headers.some(fgh => fgh.Footer.name !== 'emptyRenderer'));

	// Build Footer if any footer renderers exist
	const footer = hasFooter ? (
		<Table.Footer>
			{footerGroups.map(group => (
				<Table.Row {...{...group.getFooterGroupProps(), ...group.getFooterGroupProps(footerRowProps)}}>
					{group.headers.map(column => (
						<Table.HeaderCell {...{...column.getFooterProps(), ...column.getFooterProps(footerCellProps)}}>
							{column.render('Footer')}
						</Table.HeaderCell>
					))}
				</Table.Row>
			))}
		</Table.Footer>
	) : null;

	return (
		<>
			<Table {...{...getTableProps(), ...getTableProps(tableProps)}}>
				<Table.Header>
					{headerGroups.map(headerGroup => (
						<Table.Row {...{...headerGroup.getHeaderGroupProps(), ...headerGroup.getHeaderGroupProps(headerRowProps)}}>
							{headerGroup.headers.map(column => (
								<Table.HeaderCell {...{...column.getHeaderProps(), ...column.getHeaderProps(headerCellProps)}}>
									{column.render('Header')}
								</Table.HeaderCell>
							))}
						</Table.Row>
					))}
				</Table.Header>
				<Table.Body {...{...getTableBodyProps(), ...getTableBodyProps(bodyProps)}}>
					{rows.map(row => {
						prepareRow(row);
						return (
							<Table.Row
								{...{...row.getRowProps(), ...row.getRowProps(rowProps)}}
								onMouseEnter={() => setHoverRow(row.id)}
								onMouseLeave={() => setHoverRow('')}
							>
								{row.cells.map(cell => (
									<Table.Cell {...{...cell.getCellProps(), ...cell.getCellProps(cellProps)}}>{cell.render('Cell', {hoverRow})}</Table.Cell>
								))}
							</Table.Row>
						);
					})}
				</Table.Body>
				{footer}
			</Table>
		</>
	);
}

/**
 * Can be used in a TForm as a Table Input.
 * @param props
 * @constructor
 */
export function TableInput<A extends DefaultTableType>(props: TableInputProps<A>) {
	return <FieldArray name={props.name} render={arrayHelpers => <TableInputTable arrayHelpers={arrayHelpers} {...props} />} />;
}
