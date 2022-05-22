import { TableCell } from 'src/table/cell';

export class TableRow {
    private element: HTMLElement;

    constructor(cells: string[], rowIndex: number) {
        this.element = document.createElement('tr');
        this.element.appendChild(
            this.getRowElement(rowIndex + 1)
        );

        cells.forEach((cellData, cellIndex) => {
            this.element.appendChild(
                (new TableCell('' + cellData, rowIndex, cellIndex)).getCell()
            );
        });
    }

    public  getRow(): HTMLElement {
        return this.element;
    }

    private getRowElement(rowNumber: number): HTMLElement {
        const el = document.createElement('td');
        el.className = 'table-row-number';
        el.textContent = rowNumber + '';

        return el;
    }
}
