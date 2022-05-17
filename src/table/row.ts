import { TableCell } from 'src/table/cell';

export class TableRow {
    private element: HTMLElement;

    constructor(cells: string[], rowIndex: number) {
        this.element = document.createElement('tr');

        cells.forEach((cellData, cellIndex) => {
            this.element.appendChild(
                (new TableCell('' + cellData, rowIndex, cellIndex)).getCell()
            );
        });
    }

    public  getRow(): HTMLElement {
        return this.element;
    }
}
