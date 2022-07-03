import { TableCellListActionParamsInterface } from 'src/table/cells/types/table-cell-list-action-params.interface';
import { TableCellEditDataInterface } from 'src/table/cells/types/table-cell-edit-action-data.interface';
import { tableCellsManager } from '../cells/table-cells-manager';
import { ROW_INSERT_AFTER, ROW_INSERT_BEFORE, ROW_MOVE_NEXT, ROW_MOVE_PREV, ROW_DELETE } from 'src/table/constants/table-row-actions';

export class TableRow {
    private element: HTMLElement;

    constructor({
        cells,
        rowIndex,
        onEdit,
        onAction
    }: {
        cells: string[];
        rowIndex: number;
        onEdit: {(params: TableCellEditDataInterface): void},
        onAction: {(id: string, rowIndex: number): void}
    }) {
        this.element = document.createElement('tr');
        this.element.className = 'ultimate-csv-plugin';
        this.element.appendChild(
            tableCellsManager.getRowNumberCell(
                rowIndex + 1 + '',
                this.getHeaderActions(rowIndex, onAction)
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

    private getHeaderActions(
        rowIndex: number,
        onAction: {(id: string, rowIndex: number): void}
    ): TableCellListActionParamsInterface[] {
        return [
            {
                id: ROW_INSERT_AFTER,
                icon: 'create-new',
                label: 'Insert after',
                onSelect: () => {
                    onAction(ROW_INSERT_AFTER, rowIndex);
                }
            },
            {
                id: ROW_INSERT_BEFORE,
                icon: 'create-new',
                label: 'Insert before',
                onSelect: () => {
                    onAction(ROW_INSERT_BEFORE, rowIndex);
                }
            },
            {
                id: ROW_MOVE_NEXT,
                icon: 'up-and-down-arrows',
                label: 'Move to next',
                onSelect: () => {
                    onAction(ROW_MOVE_NEXT, rowIndex);
                }
            },
            {
                id: ROW_MOVE_PREV,
                icon: 'up-and-down-arrows',
                label: 'Move to previous',
                onSelect: () => {
                    onAction(ROW_MOVE_PREV, rowIndex);
                }
            },
            {
                id: ROW_DELETE,
                icon: 'trash',
                label: 'Delete row',
                onSelect: () => {
                    onAction(ROW_DELETE, rowIndex);
                }
            }
        ];
    }
}
