import { TableCell } from 'src/table/cell';

export class TableRow {
    private element: HTMLElement;

    constructor(cells: string[], rowIndex: number) {
        this.element = document.createElement('tr');
        this.element.appendChild(
            (new TableCell({
                text: rowIndex + 1 + '',
                editable: false,
                className: 'table-numbers',
                rowIndex: -1,
                cellIndex: -1
            }).getCell())
        );

        cells.forEach((cellData, cellIndex) => {
            this.element.appendChild(
                (new TableCell({
                    text: cellData + '',
                    editable: true,
                    className: '',
                    rowIndex,
                    cellIndex
                })).getCell()
            );
        });
    }

    public getRow(): HTMLElement {
        return this.element;
    }
}
