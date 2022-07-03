import { TableCellEditDataInterface } from 'src/table/cells/types/table-cell-edit-action-data.interface';
import { TableCellPositionInterface } from 'src/table/cells/types/table-cell-position.interface';

export interface TableCellButtonActionInterface extends TableCellPositionInterface {
    onClick: {(params: TableCellEditDataInterface): void};
}