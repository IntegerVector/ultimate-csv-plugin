import { TableCellListActionParamsInterface } from 'src/table/cells/types/table-cell-list-action-params.interface';
import { tableCellsManager } from '../cells/table-cells-manager';
import { COL_DELETE, COL_INSERT_AFTER, COL_INSERT_BEFORE, COL_MOVE_NEXT, COL_MOVE_PREV } from 'src/table/constants/table-column-actions';

export class TableHeaders {
    private element: HTMLElement;

    constructor(
        template: string[],
        onAction: {(id: string, colIndex: number): void}
    ) {
        this.element = document.createElement('tr');
        this.element.className = 'ultimate-csv-plugin';
        this.element.appendChild(
            tableCellsManager.getHeaderNumberCell('0', [])
        );
        template.forEach((cell, cellIndex) => {
            this.element.appendChild(
                tableCellsManager.getHeaderNumberCell(
                    cellIndex + 1 + cell,
                    this.getHeaderActions(cellIndex, onAction)
                )
            );
        });
    }

    public getRowWithHeaders(): HTMLElement {
        return this.element;
    }

    private getHeaderActions(
        cellIndex: number,
        onAction: {(id: string, cellIndex: number): void}
    ): TableCellListActionParamsInterface[] {
        return [
            {
                id: COL_INSERT_AFTER,
                icon: 'create-new',
                label: 'Insert after',
                onSelect: () => {
                    onAction(COL_INSERT_AFTER, cellIndex);
                }
            },
            {
                id: COL_INSERT_BEFORE,
                icon: 'create-new',
                label: 'Insert before',
                onSelect: () => {
                    onAction(COL_INSERT_BEFORE, cellIndex);
                }
            },
            {
                id: COL_MOVE_NEXT,
                icon: 'up-and-down-arrows',
                label: 'Move to next',
                onSelect: () => {
                    onAction(COL_MOVE_NEXT, cellIndex);
                }
            },
            {
                id: COL_MOVE_PREV,
                icon: 'up-and-down-arrows',
                label: 'Move to previous',
                onSelect: () => {
                    onAction(COL_MOVE_PREV, cellIndex);
                }
            },
            {
                id: COL_DELETE,
                icon: 'trash',
                label: 'Delete column',
                onSelect: () => {
                    onAction(COL_DELETE, cellIndex);
                }
            }
        ];
    }
}
