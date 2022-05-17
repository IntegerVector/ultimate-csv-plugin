import { tableState } from 'src/table-state-manager';

export class TableCell {
    private element: HTMLElement;

    constructor(text: string, rowIndex: number, cellIndex: number) {
        this.element = document.createElement('td');
        const container = document.createElement('div');
        
        container.textContent = text;

        this.element.ondblclick = () => {
            this.element.className = 'focused';
            container.contentEditable = 'true';
            container.focus();
        }

        container.onblur = () => {
            this.element.className = '';
            container.contentEditable = 'false';

            tableState.$data.next({
                data: container.textContent,
                row: rowIndex,
                cell: cellIndex
            });
        };

        this.element.appendChild(container);
    }

    public getCell() {
        return this.element;
    }
}
