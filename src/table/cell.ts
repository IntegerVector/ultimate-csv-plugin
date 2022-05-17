import { tableState } from 'src/table-state-manager';

export class TableCell {
    private element: HTMLElement;

    constructor(text: string, rowIndex: number, cellIndex: number) {
        this.element = document.createElement('td');
        const container = document.createElement('div');
        
        container.textContent = text;
        container.onblur = () => {
            container.contentEditable = 'false';
            this.element.className = '';
            tableState.$data.next({
                data: container.textContent,
                row: rowIndex,
                cell: cellIndex
            });
        };
        container.ondblclick = () => {
            container.contentEditable = 'true';
            container.focus();
            this.element.className = 'focused';
        }
        this.element.appendChild(container);
    }

    public getCell() {
        return this.element;
    }
}
