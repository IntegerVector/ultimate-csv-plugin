import {
    TextFileView,
    WorkspaceLeaf
} from 'obsidian';

import { CsvTable } from 'src/table/table';
import { CSV } from 'src/common/csv-parser';

export class CsvView extends TextFileView {
    public get extContentEl(): HTMLElement {
        return this.contentEl;
    }

    public table = new CsvTable();

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);

        this.extContentEl.appendChild(this.table.getElement());
        this.table.$tableData.subscribe(data => {
            CSV.stringify(data).then(rawData => {
                this.data = rawData;
            })
        });
    }

    getViewData(): string {
        return this.data;
    }

    setViewData(data: string, clear: boolean): void {
        CSV.parse(data || '').then((parsed) => {
            this.table.$tableData.next(parsed);
        });
    }

    clear(): void {
        this.table.clear();
        this.table.$tableData.clearAll();
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
