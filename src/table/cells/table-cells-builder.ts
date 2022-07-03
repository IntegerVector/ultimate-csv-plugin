import { TableCellButtonActionInterface as TableCellButtonActionParamsInterface } from 'src/table/cells/types/table-cell-button-action.interface';
import { TableCellEditActionParamsInterface } from './types/table-cell-edit-action-params.interface';

export class TableCellsBuilder {
    private content: string;
    private className: string;
    private editActionParams: TableCellEditActionParamsInterface;
    private clickActionParams: TableCellButtonActionParamsInterface;

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
        params: TableCellButtonActionParamsInterface
    ): TableCellsBuilder {
        this.clickActionParams = params;
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

        tableCellElementWrapper.appendChild(cellElement);

        return tableCellElementWrapper;
    }
}
