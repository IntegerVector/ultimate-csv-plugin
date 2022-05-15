import {
	Plugin,
	WorkspaceLeaf,
	TextFileView
} from 'obsidian';

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
		this.table.setData(data);
	}

	clear(): void {
	}

	getDisplayText(): string {
		if (this.file) {
			return this.file.basename;
		}
		else return 'No file';
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
