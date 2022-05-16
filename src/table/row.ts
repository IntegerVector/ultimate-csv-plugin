import { TableCell } from 'src/table/cell';

export class TableRow {
    private element: HTMLElement;

    constructor(cells: string[], rowNumber: number) {
        this.element = document.createElement('tr');

        cells.forEach(cell => {
            this.element.appendChild(
                (new TableCell('' + cell)).getCell()
            );
        });
    }

    public  getRow(): HTMLElement {
        return this.element;
    }
}
