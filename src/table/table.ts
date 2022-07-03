import { TableHeaders } from './table-headers';
import { TableRow } from './table-row';
import { Subject } from 'src/common/subject';
import { TableCellEditDataInterface } from 'src/table/cells/types/table-cell-edit-action-data.interface';
import { tableCellsManager } from './cells/table-cells-manager';

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

        const header = new TableHeaders(this.getNewEmptyRow()).getRowWithHeaders();
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
                    onEdit: this.onCellEdit.bind(this)
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
}
