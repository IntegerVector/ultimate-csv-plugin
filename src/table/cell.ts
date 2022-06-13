export class TableCell {
    private element: HTMLElement;

    constructor({
        text,
        rowIndex,
        cellIndex,
        editable,
        className,
        onEdit
    }: {
        text: string;
        rowIndex: number;
        cellIndex: number;
        editable: boolean,
        className: string;
        onEdit?: {
            (
                data: string,
                row: number,
                cell: number
            ): void
        }
    }) {
        this.element = document.createElement('td');
        const container = document.createElement('div');

        this.element.className = 'ultimate-csv-plugin';
        container.className = 'ultimate-csv-plugin';
        container.textContent = text;

        if (editable) {
            this.element.ondblclick = () => {
                this.element.className = 'ultimate-csv-plugin focused';
                container.contentEditable = 'true';
                container.focus();
            }

            container.onblur = () => {
                this.element.className = 'ultimate-csv-plugin';
                container.contentEditable = 'false';
                if (onEdit) {
                    onEdit(
                        container.textContent,
                        rowIndex,
                        cellIndex
                    )
                }
            };
        }

        this.element.className = className;
        this.element.appendChild(container);
    }

    public getCell() {
        return this.element;
    }
}
