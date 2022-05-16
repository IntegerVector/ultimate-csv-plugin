import {
	Plugin,
	WorkspaceLeaf,
	TextFileView
} from 'obsidian';

import { CSV } from './src/csv-parser';
import { CSVTable } from './src/table/table';

export default class UltimateCsvPlugin extends Plugin {
	async onload() {
		this.registerView('csv', leaf => new CsvView(leaf));
		this.registerExtensions(['csv'], 'csv');
	}
}

class CsvView extends TextFileView {
	public get extContentEl(): HTMLElement {
		return this.contentEl;
	}

	public table = new CSVTable();

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.extContentEl.appendChild(this.table.tableElement);
	}

	getViewData(): string {
		return this.data;
	}

	setViewData(data: string, clear: boolean): void {
		CSV.parse(data).then((parsed) => {
			this.table.clear();
			this.table.setData(parsed);
		});
	}

	clear(): void {
		this.table.clear();
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
