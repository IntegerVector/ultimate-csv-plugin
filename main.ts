import { Plugin } from 'obsidian';
import { CsvView } from './src/csv-view';

export default class UltimateCsvPlugin extends Plugin {
	async onload() {
		this.registerView('csv', leaf => new CsvView(leaf));
		this.registerExtensions(['csv'], 'csv');
	}
}
