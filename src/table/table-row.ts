import { TableCellListActionParamsInterface } from 'src/table/cells/types/table-cell-list-action-params.interface';
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
            tableCellsManager.getRowNumberCell(
                rowIndex + 1 + '',
                this.getHeaderActions()
            )
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

    private getHeaderActions(): TableCellListActionParamsInterface[] {
        return [
            {
                id: 'insert-after-row',
                icon: 'create-new',
                label: 'Insert after',
                onSelect: (id, el) => {
                    console.log('on insert after: ', id, el);
                }
            },
            {
                id: 'insert-before-row',
                icon: 'create-new',
                label: 'Insert before',
                onSelect: (id, el) => {
                    console.log('on insert before: ', id, el);
                }
            },
            {
                id: 'move-to-next-row',
                icon: 'up-and-down-arrows',
                label: 'Move to next',
                onSelect: (id, el) => {
                    console.log('on move after: ', id, el);
                }
            },
            {
                id: 'move-to-prev-row',
                icon: 'up-and-down-arrows',
                label: 'Move to previous',
                onSelect: (id, el) => {
                    console.log('on move before: ', id, el);
                }
            },
            {
                id: 'delete-row',
                icon: 'trash',
                label: 'Delete row',
                onSelect: (id, el) => {
                    console.log('on delete:', id, el)
                }
            }
        ];
    }
}
