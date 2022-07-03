import { TableCellEditDataInterface } from './table-cell-edit-action-data.interface';
import { TableCellPositionInterface } from './table-cell-position.interface';

export interface TableCellEditActionParamsInterface extends TableCellPositionInterface {
    onEdit: {(params: TableCellEditDataInterface): void};
}
