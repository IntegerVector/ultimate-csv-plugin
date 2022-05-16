import { TableRow } from './row';

export class CSVTable {
    public tableElement = document.createElement('table');

    public setData(rows: string[][]): void {
        rows.forEach((row, index) => {
            this.tableElement.appendChild(
                (new TableRow(row, index + 1)).getRow()
            );
        });
    }

    public clear(): void {
        while (this.tableElement.lastChild) {
            this.tableElement.removeChild(this.tableElement.lastChild);
        }
    }
}
