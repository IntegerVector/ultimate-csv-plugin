import { TableHeader } from './header';
import { TableRow } from './row';
import { TableCell } from 'src/table/cell';
import { tableState } from '../table-state-manager';

export class CsvTable {
    private tableElement = document.createElement('table');
    private rows: string[][];

    public setRows(rows: string[][]): void {
        this.rows = rows;

        const header = new TableHeader(this.getNewEmptyRow()).getRow();
        header.appendChild(this.getAddItemElement(
            'table-add-new-cell',
            this.onNewCell.bind(this)
        ));
        this.tableElement.appendChild(header);

        rows.forEach((row, index) => {
            this.tableElement.appendChild(
                (new TableRow(row, index)).getRow()
            );

            if (index === this.rows.length - 1) {
                this.tableElement.appendChild(
                    this.getAddItemElement(
                        'table-add-new-row',
                        this.onNewRow.bind(this)
                    )
                );
            }
        });
    }

    public getRows() {
        return this.rows;
    }

    public getElement(): HTMLElement {
        return this.tableElement;
    }

    public clear(): void {
        while (this.tableElement.lastChild) {
            this.tableElement.removeChild(this.tableElement.lastChild);
        }
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
        tableState.$rowAdded.next(this.getNewEmptyRow());
    }

    private onNewCell(): void {
        const newRows = this.rows.map(row => {
            row.push('');
            return row;
        });

        tableState.$cellAdded.next(newRows);
    }
}
