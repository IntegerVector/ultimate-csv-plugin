import {
    TextFileView,
    WorkspaceLeaf
} from 'obsidian';

import { CsvTable } from 'src/table/table';
import { CSV } from 'src/common/csv-parser';
import { tableState } from 'src/table-state-manager';
import { Subject } from 'src/common/subject';

export class CsvView extends TextFileView {
    public get extContentEl(): HTMLElement {
        return this.contentEl;
    }

    public table = new CsvTable();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private subjects: Subject<any>[] = [];

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);

        this.extContentEl.appendChild(this.table.getElement());
        this.initSubscriptions();
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
        this.clearSubscriptions();
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

    private updateData(rows: string[][]): void {
        CSV.stringify(rows).then(data => {
            this.data = data;
            this.setViewData(data, false);
        })
    }

    private initSubscriptions(): void {
        this.subjects = [
            tableState.$cellChanged.subscribe(({ row, cell, data }) => {
                const tableRows = this.table.getRows();
                tableRows[row][cell] = data;
                this.updateData(tableRows); 
            }),
            tableState.$rowAdded.subscribe(row => {
                const tableRows = this.table.getRows();
                tableRows.push(row);
                this.updateData(tableRows); 
            }),
            tableState.$cellAdded.subscribe(rows => {
                this.updateData(rows);
            })
        ];
    }

    private clearSubscriptions(): void {
        this.subjects.forEach(sub => {
            sub.clearAll();
        });
    }
}
