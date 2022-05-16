export class TableCell {
    private element: HTMLElement;

    constructor(text: string) {
        this.element = document.createElement('td');
        this.element.textContent = text;
    }

    public getCell() {
        return this.element;
    }
}
