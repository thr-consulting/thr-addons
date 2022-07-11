import {Table, TableProps, useMantineTheme} from '@mantine/core';
import debug from 'debug';
import {FieldArray, FieldArrayRenderProps} from 'formik';
import {CSSProperties, useMemo, useState} from 'react';
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

const d = debug('thx.controls.inputs.TableInput');

type DefaultTableType = Record<string, unknown>;

export interface CustomTableProps {
	celled?: boolean;
}

interface TableInputProps<A extends DefaultTableType> {
	name: string;
	values: A[];
	columns: Column<A>[];
	setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
	createRow: () => A;
	tableProps?: TableProps & CustomTableProps;
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
	const theme = useMantineTheme();

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

	const celledStyle = (col: number): CSSProperties | undefined => {
		return tableProps?.celled ? {borderLeftWidth: col === 0 ? 0 : 1, borderLeftColor: theme.colors.gray[8], borderLeftStyle: 'solid'} : undefined;
	};

	// Build Footer if any footer renderers exist
	const footer = hasFooter ? (
		<tfoot>
			{footerGroups.map(group => (
				// eslint-disable-next-line react/jsx-key
				<tr {...{...group.getFooterGroupProps(), ...group.getFooterGroupProps(footerRowProps)}}>
					{group.headers.map((column, col) => {
						const thProps = {
							...column.getFooterProps(),
							...column.getFooterProps(footerCellProps),
						};
						thProps.style = {...thProps.style, ...celledStyle(col)};
						return (
							// eslint-disable-next-line react/jsx-key
							<th {...thProps}>{column.render('Footer')}</th>
						);
					})}
				</tr>
			))}
		</tfoot>
	) : null;

	return (
		<Table {...{...getTableProps(), ...getTableProps(tableProps)}}>
			<thead>
				{headerGroups.map(headerGroup => (
					// eslint-disable-next-line react/jsx-key
					<tr {...{...headerGroup.getHeaderGroupProps(), ...headerGroup.getHeaderGroupProps(headerRowProps)}}>
						{headerGroup.headers.map((column, col) => {
							const thProps = {
								...column.getHeaderProps(),
								...column.getHeaderProps(headerCellProps),
							};
							thProps.style = {...thProps.style, ...celledStyle(col)};
							return (
								// eslint-disable-next-line react/jsx-key
								<th {...thProps}>{column.render('Header')}</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody {...{...getTableBodyProps(), ...getTableBodyProps(bodyProps)}}>
				{rows.map(row => {
					prepareRow(row);
					return (
						// eslint-disable-next-line react/jsx-key
						<tr
							{...{...row.getRowProps(), ...row.getRowProps(rowProps)}}
							onMouseEnter={() => setHoverRow(row.id)}
							onMouseLeave={() => setHoverRow('')}
						>
							{row.cells.map((cell, col) => {
								const tdProps = {
									...cell.getCellProps(),
									...cell.getCellProps(cellProps),
								};
								tdProps.style = {...tdProps.style, ...celledStyle(col)};
								return (
									// eslint-disable-next-line react/jsx-key
									<td {...tdProps}>{cell.render('Cell', {hoverRow})}</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
			{footer}
		</Table>
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
