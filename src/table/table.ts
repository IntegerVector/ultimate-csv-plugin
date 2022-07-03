import { TableHeaders } from './rows/table-headers';
import { TableRow } from './rows/table-row';
import { Subject } from 'src/common/subject';
import { TableCellEditDataInterface } from 'src/table/cells/types/table-cell-edit-action-data.interface';
import { tableCellsManager } from './cells/table-cells-manager';
import { COL_DELETE, COL_INSERT_AFTER, COL_INSERT_BEFORE, COL_MOVE_NEXT, COL_MOVE_PREV } from 'src/table/constants/table-column-actions';
import { ROW_DELETE, ROW_INSERT_AFTER, ROW_INSERT_BEFORE, ROW_MOVE_NEXT, ROW_MOVE_PREV } from 'src/table/constants/table-row-actions';

export class CsvTable {
    public $tableData = new Subject<string[][]>();

    private tableElement = document.createElement('table');
    private rows: string[][];

    constructor() {
        this.tableElement.className = 'ultimate-csv-plugin';
        this.$tableData.subscribe(rows => {
            this.setRows(rows);
        });
    }

    public getElement(): HTMLElement {
        return this.tableElement;
    }

    public clear(): void {
        this.tableElement.innerHTML = '';
    }

    private setRows(rows: string[][]): void {
        this.rows = rows;
        this.clear();

        const header = new TableHeaders(
            this.getNewEmptyRow(),
            this.onColAction.bind(this)
        ).getRowWithHeaders();
        const newColBtn = tableCellsManager.getButtonCell(
            '+',
            'table-add-new-cell',
            {
                rowIndex: 0,
                cellIndex: 0,
                onClick: this.onNewCell.bind(this)
            }
        );
        header.appendChild(newColBtn);
        this.tableElement.appendChild(header);

        rows.forEach((cells, rowIndex) => {
            this.tableElement.appendChild(
                (new TableRow({
                    cells,
                    rowIndex,
                    onEdit: this.onCellEdit.bind(this),
                    onAction: this.onRowAction.bind(this)
                })).getRow()
            );

            if (rowIndex === this.rows.length - 1) {
                const newRowBtn = tableCellsManager.getButtonCell(
                    '+',
                    'table-add-new-row',
                    {
                        rowIndex: 0,
                        cellIndex: 0,
                        onClick: this.onNewRow.bind(this)
                    }
                );
                this.tableElement.appendChild(newRowBtn);
            }
        });
    }

    private getNewEmptyRow(): string[] {
        if (this.rows.length) {
            const rowElementsAmount = this.rows[0].length;
            const newRow = new Array(rowElementsAmount);
            newRow.fill('');

            return newRow;
        } else {
            return [''];
        }
    }

    private onNewRow(): void {
        this.rows.push(this.getNewEmptyRow());
        this.$tableData.next(this.rows);
    }

    private onNewCell(): void {
        const newRows = this.rows.map(row => {
            row.push('');
            return row;
        });

        this.$tableData.next(newRows);
    }

    private onCellEdit(results: TableCellEditDataInterface): void {
        this.rows[results.rowIndex][results.cellIndex] = results.data;
        this.$tableData.next(this.rows);
    }

    private onRowAction(action: string, rowIndex: number): void {
        switch (action) {
            case ROW_INSERT_AFTER:
                this.insertRowAfter(rowIndex);
                break;
            case ROW_INSERT_BEFORE:
                this.insertRowBefore(rowIndex);
                break;
            case ROW_MOVE_NEXT:
                this.moveRowNext(rowIndex);
                break;
            case ROW_MOVE_PREV:
                this.moveRowPrev(rowIndex);
                break;
            case ROW_DELETE:
                this.deleteRow(rowIndex);
                break;
            default:
                console.error('Wrong row action id!');
        }
    }

    private onColAction(action: string, cellIndex: number): void {
        switch (action) {
            case COL_INSERT_AFTER:
                this.insertColAfter(cellIndex);
                break;
            case COL_INSERT_BEFORE:
                this.insertColBefore(cellIndex);
                break;
            case COL_MOVE_NEXT:
                this.moveColNext(cellIndex);
                break;
            case COL_MOVE_PREV:
                this.moveColPrev(cellIndex);
                break;
            case COL_DELETE:
                this.deleteCol(cellIndex);
                break;
            default:
                console.error('Wrong column action id!');
        }
    }

    private insertRowAfter(rowIndex: number): void {
        this.rows.splice(rowIndex + 1, 0, this.getNewEmptyRow());
        this.$tableData.next(this.rows);
    }

    private insertRowBefore(rowIndex: number): void {
        this.rows.splice(rowIndex, 0, this.getNewEmptyRow());
        this.$tableData.next(this.rows);
    }

    private moveRowNext(rowIndex: number): void {
        if (rowIndex < this.rows.length - 1) {
            const tmpVal = this.rows[rowIndex + 1];
            this.rows[rowIndex + 1] = this.rows[rowIndex];
            this.rows[rowIndex] = tmpVal;
            this.$tableData.next(this.rows);
        }
    }

    private moveRowPrev(rowIndex: number): void {
        if (rowIndex > 0) {
            const tmpVal = this.rows[rowIndex - 1];
            this.rows[rowIndex - 1] = this.rows[rowIndex];
            this.rows[rowIndex] = tmpVal;
            this.$tableData.next(this.rows);
        }
    }

    private deleteRow(rowIndex: number): void {
        this.rows.splice(rowIndex, 1);
        this.$tableData.next(this.rows);
    }

    private insertColAfter(colIndex: number): void {
        this.rows.forEach(row => {
            row.splice(colIndex + 1, 0, '');
        });
        this.$tableData.next(this.rows);
    }

    private insertColBefore(colIndex: number): void {
        this.rows.forEach(row => {
            row.splice(colIndex, 0, '');
        });
        this.$tableData.next(this.rows);
    }

    private moveColNext(colIndex: number): void {
        if (colIndex < this.rows[0].length - 1) {
            this.rows.forEach(row => {
                const tmpVal = row[colIndex + 1];
                row[colIndex + 1] = row[colIndex];
                row[colIndex] = tmpVal;
            });
            this.$tableData.next(this.rows);
        }
    }

    private moveColPrev(colIndex: number) : void {
        if (colIndex > 0) {
            this.rows.forEach(row => {
                const tmpVal = row[colIndex - 1];
                row[colIndex - 1] = row[colIndex];
                row[colIndex] = tmpVal;
            });
            this.$tableData.next(this.rows);
        }
    }

    private deleteCol(colIndex: number): void {
        this.rows.forEach(row => {
            row.splice(colIndex, 1);
        });
        this.$tableData.next(this.rows);
    }
}
