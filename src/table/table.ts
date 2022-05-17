import { TableRow } from './row';

export class CsvTable {
    private tableElement = document.createElement('table');
    private rows: string[][];

    public setRows(rows: string[][]): void {
        this.rows = rows;
        rows.forEach((row, index) => {
            this.tableElement.appendChild(
                (new TableRow(row, index)).getRow()
            );
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
}
