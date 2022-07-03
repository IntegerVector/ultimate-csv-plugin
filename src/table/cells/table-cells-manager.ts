import { TableCellButtonActionInterface } from 'src/table/cells/types/table-cell-button-action.interface';
import { TableCellEditActionParamsInterface } from 'src/table/cells/types/table-cell-edit-action-params.interface';
import { TableCellListActionParamsInterface } from 'src/table/cells/types/table-cell-list-action-params.interface';
import { TableCellsBuilder } from './table-cells-builder';

class TableCellsManager {
    public getEmptyCell(): HTMLElement {
        const builder = new TableCellsBuilder();
        return builder.build();
    }

    public getHeaderNumberCell(
        number: string,
        actions: TableCellListActionParamsInterface[]
    ): HTMLElement {
        const builder = new TableCellsBuilder();
        return builder
            .withClassName('table-numbers')
            .withContent(number)
            .withListOfAction(actions)
            .build();
    }

    public getRowNumberCell(
        number: string,
        actions: TableCellListActionParamsInterface[]
    ): HTMLElement {
        const builder = new TableCellsBuilder();
        return builder
            .withClassName('table-numbers')
            .withListOfAction(actions)
            .withContent(number)
            .build();
    }

    public getButtonCell(
        textContent: string,
        className: string,
        clickParams: TableCellButtonActionInterface
    ): HTMLElement {
        const builder = new TableCellsBuilder();
        return builder
            .withContent(textContent)
            .withClassName(className)
            .withClickAction(clickParams)
            .build();
    }

    public getTableCell(
        textContent: string,
        editParams: TableCellEditActionParamsInterface
    ): HTMLElement {
        const builder = new TableCellsBuilder();
        return builder
            .withContent(textContent)
            .withEditAction(editParams)
            .build();
    }
}

export const tableCellsManager = new TableCellsManager();
