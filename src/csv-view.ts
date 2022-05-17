import {
    TextFileView,
    WorkspaceLeaf
} from 'obsidian';

import { CsvTable } from 'src/table/table';
import { CSV } from 'src/common/csv-parser';
import { tableState } from 'src/table-state-manager';

export class CsvView extends TextFileView {
    public get extContentEl(): HTMLElement {
        return this.contentEl;
    }

    public table = new CsvTable();

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);

        this.extContentEl.appendChild(this.table.getElement());

        tableState.$data.subscribe(({ row, cell, data }) => {
            const tableRows = this.table.getRows();
            tableRows[row][cell] = data;

            CSV.stringify(tableRows).then(data => {
                this.data = data;
            })
        });
    }

    getViewData(): string {
        return this.data;
    }

    setViewData(data: string, clear: boolean): void {
        CSV.parse(data).then((parsed) => {
            this.table.clear();
            this.table.setRows(parsed);
        });
    }

    clear(): void {
        this.table.clear();
        tableState.$data.clearAll();
    }

    getDisplayText(): string {
        return this.file
            ? this.file.basename
            : 'No file';
    }

    canAcceptExtension(extension: string): boolean {
        return extension === 'csv';
    }

    getViewType(): string {
        return 'csv';
    }

    getIcon(): string {
        return 'document-csv';
    }
}
