import { TableCellListActionParamsInterface } from 'src/table/cells/types/table-cell-list-action-params.interface';
import { tableCellsManager } from './cells/table-cells-manager';

export class TableHeaders {
    private element: HTMLElement;

    constructor(template: string[]) {
        this.element = document.createElement('tr');
        this.element.className = 'ultimate-csv-plugin';
        this.element.appendChild(
            tableCellsManager.getHeaderNumberCell('0', [])
        );
        template.forEach((cell, cellIndex) => {
            this.element.appendChild(
                tableCellsManager.getHeaderNumberCell(
                    cellIndex + 1 + cell,
                    this.getHeaderActions()
                )
            );
        });
    }

    public getRowWithHeaders(): HTMLElement {
        return this.element;
    }

    private getHeaderActions(): TableCellListActionParamsInterface[] {
        return [
            {
                id: 'insert-after-col',
                icon: 'create-new',
                label: 'Insert after',
                onSelect: (id, el) => {
                    console.log('on insert after: ', id, el);
                }
            },
            {
                id: 'insert-before-col',
                icon: 'create-new',
                label: 'Insert before',
                onSelect: (id, el) => {
                    console.log('on insert before: ', id, el);
                }
            },
            {
                id: 'move-to-next-col',
                icon: 'up-and-down-arrows',
                label: 'Move to next',
                onSelect: (id, el) => {
                    console.log('on move after: ', id, el);
                }
            },
            {
                id: 'move-to-prev-col',
                icon: 'up-and-down-arrows',
                label: 'Move to previous',
                onSelect: (id, el) => {
                    console.log('on move before: ', id, el);
                }
            },
            {
                id: 'delete-col',
                icon: 'trash',
                label: 'Delete column',
                onSelect: (id, el) => {
                    console.log('on delete:', id, el)
                }
            }
        ];
    }
}
