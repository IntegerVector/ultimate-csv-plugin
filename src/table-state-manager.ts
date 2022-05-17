import { Subject } from 'src/common/subject';

export const tableState = {
    $data: new Subject<{
        data: string,
        row: number,
        cell: number
    }>()
};
