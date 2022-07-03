export interface TableCellListActionParamsInterface {
    id: string;
    icon: string;
    label: string;
    onSelect: { (id: string, el: HTMLElement): void };
}
