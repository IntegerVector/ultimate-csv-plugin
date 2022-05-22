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
