import { TableCell } from './cell';

export class TableHeader {
    private element: HTMLElement;

    constructor(template: string[]) {
        this.element = document.createElement('tr');
        this.element.className = 'ultimate-csv-plugin';
        this.element.appendChild(
            (new TableCell({
                text: ' ',
                className: 'ultimate-csv-plugin table-numbers',
                editable: false,
                rowIndex: -1,
                cellIndex: -1,
            }).getCell())
        );
        template.forEach((cell, cellIndex) => {
            this.element.appendChild(
                (new TableCell({
                    text: cellIndex + 1 + cell,
                    className: 'ultimate-csv-plugin table-numbers',
                    editable: false,
                    rowIndex: -1,
                    cellIndex
                })).getCell()
            );
        });
    }

    public getRow(): HTMLElement {
        return this.element;
    }
}
