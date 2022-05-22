import { TableHeader } from './header';
import { TableRow } from './row';
import { TableCell } from './cell';
import { Subject } from 'src/common/subject';

export class CsvTable {
    public $tableData = new Subject<string[][]>();

    private tableElement = document.createElement('table');
    private rows: string[][];

    constructor() {
        this.$tableData.subscribe(rows => {
            this.setRows(rows);
        });
    }

    public getElement(): HTMLElement {
        return this.tableElement;
    }

    public clear(): void {
        while (this.tableElement.lastChild) {
            this.tableElement.removeChild(this.tableElement.lastChild);
        }
    }

    private setRows(rows: string[][]): void {
        this.rows = rows;

        this.clear();

        const header = new TableHeader(this.getNewEmptyRow()).getRow();
        header.appendChild(this.getAddItemElement(
            'table-add-new-cell',
            this.onNewCell.bind(this)
        ));
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
                this.tableElement.appendChild(
                    this.getAddItemElement(
                        'table-add-new-row',
                        this.onNewRow.bind(this)
                    )
                );
            }
        });
    }

    private getAddItemElement(className: string, callBack: { (): void; }): HTMLElement {
        const el = new TableCell({
            text: '+',
            editable: false,
            rowIndex: -1,
            cellIndex: -1,
            className
        }).getCell();

        el.onclick = () => {
            callBack();
        }

        return el;
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

    private onCellEdit(data: string, row: number, cell: number): void {
        this.rows[row][cell] = data;
        this.$tableData.next(this.rows);
    }
}
