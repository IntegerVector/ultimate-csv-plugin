import { tableCellsManager } from './cells/table-cells-manager';

export class TableHeaders {
    private element: HTMLElement;

    constructor(template: string[]) {
        this.element = document.createElement('tr');
        this.element.className = 'ultimate-csv-plugin';
        this.element.appendChild(
            tableCellsManager.getHeaderNumberCell('0')
        );
        template.forEach((cell, cellIndex) => {
            this.element.appendChild(
                tableCellsManager.getHeaderNumberCell(cellIndex + 1 + cell)
            );
        });
    }

    public getRowWithHeaders(): HTMLElement {
        return this.element;
    }
}
