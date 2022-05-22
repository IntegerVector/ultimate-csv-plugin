import { TableRow } from './row';
import { tableState } from '../table-state-manager';

export class CsvTable {
    private tableElement = document.createElement('table');
    private rows: string[][];

    public setRows(rows: string[][]): void {
        this.rows = rows;
        rows.forEach((row, index) => {
            this.tableElement.appendChild(
                (new TableRow(row, index)).getRow()
            );

            if (index === this.rows.length - 1) {
                this.tableElement.appendChild(
                    this.getAddItemElement()
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

    private getAddItemElement(): HTMLElement {
        const el = document.createElement('tr');
        const plusIconEl = document.createElement('td');
        plusIconEl.className = 'table-add-new-row';
        plusIconEl.textContent = '+';
        plusIconEl.onclick = () => {
            this.onAddNewRowClicked();
        }

        el.appendChild(plusIconEl);
        return el;
    }

    private onAddNewRowClicked(): void {
        if (this.rows.length) {
            const rowElementsAmount = this.rows[0].length;
            const newRow = new Array(rowElementsAmount);
            newRow.fill('');

            tableState.$rowAdded.next(newRow);
        } else {
            tableState.$rowAdded.next(['']);
        }
    }
}
