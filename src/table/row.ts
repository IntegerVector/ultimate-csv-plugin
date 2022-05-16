export class TableRow {
    private element: HTMLElement;

    constructor(cells: string[], rowNumber: number) {
        this.element = document.createElement('tr');

        cells.forEach((cell, index) => {
            const td = document.createElement('td');
            td.textContent = '' + cell;
            td.id = `${rowNumber}_${index + 1}`;
            this.element.appendChild(td);
        });
    }

    public  getRow(): HTMLElement {
        return this.element;
    }
}
