import { Subject } from 'src/common/subject';

export const tableState = {
    $cellChanged: new Subject<{
        data: string,
        row: number,
        cell: number
    }>(),
    $rowAdded: new Subject<string[]>()
};
