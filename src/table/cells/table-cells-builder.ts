import { Menu, setIcon } from "obsidian";

import { TableCellEditActionParamsInterface } from './types/table-cell-edit-action-params.interface';
import { TableCellListActionParamsInterface } from './types/table-cell-list-action-params.interface';
import { TableCellButtonActionInterface } from './types/table-cell-button-action.interface';

export class TableCellsBuilder {
    private content: string;
    private className: string;
    private editActionParams: TableCellEditActionParamsInterface;
    private clickActionParams: TableCellButtonActionInterface;
    private listOfActions: TableCellListActionParamsInterface[];

    public withContent(text: string): TableCellsBuilder {
        this.content = text;
        return this;
    }

    public withClassName(className: string): TableCellsBuilder {
        this.className = className;
        return this;
    }

    public withEditAction(
        params: TableCellEditActionParamsInterface
    ): TableCellsBuilder {
        this.editActionParams = params;
        return this;
    }

    public withClickAction(
        params: TableCellButtonActionInterface
    ): TableCellsBuilder {
        this.clickActionParams = params;
        return this;
    }

    public withListOfAction(
        actions: TableCellListActionParamsInterface[]
    ): TableCellsBuilder {
        this.listOfActions = actions;
        return this;
    }

    public build(): HTMLElement {
        const fullClassName = 'ultimate-csv-plugin ' + (this.className || '');
        const tableCellElementWrapper = document.createElement('td')
        tableCellElementWrapper.className = fullClassName;

        const cellElement = document.createElement('div');
        cellElement.className = 'ultimate-csv-plugin';
        cellElement.textContent = this.content || '';

        if (this.editActionParams) {
            tableCellElementWrapper.ondblclick = () => {
                tableCellElementWrapper.className = fullClassName + ' focused';
                cellElement.contentEditable = 'true';
                cellElement.focus();
            }

            const edited = this.editActionParams;
            cellElement.onblur = () => {
                tableCellElementWrapper.className = fullClassName;
                cellElement.contentEditable = 'false';
                this.editActionParams.onEdit({
                    data: cellElement.textContent,
                    rowIndex: edited.rowIndex,
                    cellIndex: edited.cellIndex
                });
            };
        }

        if (this.clickActionParams) {
            const clicked = this.clickActionParams;
            cellElement.onclick = () => {
                clicked.onClick({
                    rowIndex: clicked.rowIndex,
                    cellIndex: clicked.cellIndex,
                    data: cellElement.textContent
                });
            }
        }

        if (this.listOfActions && this.listOfActions.length) {
            const menu = new Menu();
            const actionBtn = document.createElement('a');
            const openActionsListEvent = (event: MouseEvent) => {
                menu.showAtMouseEvent(event);
            };

            actionBtn.className = 'view-action';
            actionBtn.ariaLabel = 'Options';
            actionBtn.onclick = openActionsListEvent;
            setIcon(actionBtn, 'vertical-three-dots');

            this.listOfActions.forEach(action => {
                menu.addItem(item => {
                    item
                        .setTitle(action.label)
                        .setIcon(action.icon)
                        .onClick(() => {
                            action.onSelect(action.id, cellElement)
                        })
                });
            });

            cellElement.appendChild(actionBtn);
        }

        tableCellElementWrapper.appendChild(cellElement);

        return tableCellElementWrapper;
    }
}
