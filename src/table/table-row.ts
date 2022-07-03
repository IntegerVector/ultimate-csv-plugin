import { TableCellEditDataInterface } from 'src/table/cells/types/table-cell-edit-action-data.interface';
import { tableCellsManager } from './cells/table-cells-manager';

export class TableRow {
    private element: HTMLElement;

    constructor({
        cells,
        rowIndex,
        onEdit
    }: {
        cells: string[];
        rowIndex: number;
        onEdit: {(params: TableCellEditDataInterface): void}
    }) {
        this.element = document.createElement('tr');
        this.element.className = 'ultimate-csv-plugin';
        this.element.appendChild(
            tableCellsManager.getRowNumberCell(rowIndex + 1 + '')
        );
        cells.forEach((cellData, cellIndex) => {
            this.element.appendChild(
                tableCellsManager.getTableCell(
                    cellData + '',
                    {
                        rowIndex,
                        cellIndex,
                        onEdit
                    })
            );
        });
    }

    public getRow(): HTMLElement {
        return this.element;
    }
}
