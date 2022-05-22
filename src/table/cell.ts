import { tableState } from 'src/table-state-manager';

export class TableCell {
    private element: HTMLElement;

    constructor({
        text,
        rowIndex,
        cellIndex,
        editable,
        className
    }: {
        text: string;
        rowIndex: number;
        cellIndex: number;
        editable: boolean,
        className: string
    }) {
        this.element = document.createElement('td');
        const container = document.createElement('div');

        container.textContent = text;

        if (editable) {
            this.element.ondblclick = () => {
                this.element.className = 'focused';
                container.contentEditable = 'true';
                container.focus();
            }

            container.onblur = () => {
                this.element.className = '';
                container.contentEditable = 'false';

                tableState.$cellChanged.next({
                    data: container.textContent,
                    row: rowIndex,
                    cell: cellIndex
                });
            };
        }

        this.element.className = className;
        this.element.appendChild(container);
    }

    public getCell() {
        return this.element;
    }
}
