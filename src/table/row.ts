import { TableCell } from 'src/table/cell';

export class TableRow {
    private element: HTMLElement;

    constructor({
        cells,
        rowIndex,
        onEdit
    }: {
        cells: string[];
        rowIndex: number;
        onEdit: {
            (
                data: string,
                row: number,
                cell: number
            ): void
        }
    }) {
        this.element = document.createElement('tr');
        this.element.appendChild(
            (new TableCell({
                text: rowIndex + 1 + '',
                editable: false,
                className: 'table-numbers',
                rowIndex: -1,
                cellIndex: -1,
            }).getCell())
        );

        cells.forEach((cellData, cellIndex) => {
            this.element.appendChild(
                (new TableCell({
                    text: cellData + '',
                    editable: true,
                    className: '',
                    rowIndex,
                    cellIndex,
                    onEdit
                })).getCell()
            );
        });
    }

    public getRow(): HTMLElement {
        return this.element;
    }
}
