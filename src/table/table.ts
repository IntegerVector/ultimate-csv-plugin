/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Papa from 'papaparse';

export class CSVTable {
    public tableElement = document.createElement('table');

    constructor() {

    }

    public setData(data: string): void {
        this.parseCSV(data)
            .then(res => {
                console.log(res);
                const rows: string[][] = res.data;
                rows.forEach(row => {
                    const rowElement = this.getRow(row);
                    this.tableElement.appendChild(rowElement);
                });
            })
            .catch(err => {

            });
    }

    private getRow(row: string[] = []): HTMLElement {
        const tr = document.createElement('tr');
        row.forEach(item => {
            const td = document.createElement('td');
            td.textContent = item;
            tr.appendChild(td);
        });

        return tr;
    }

    private parseCSV(data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Papa.parse(data, {
                header: false,
                complete: (res: any) => {
                    resolve(res);
                },
                error: (err: any) => {
                    reject(err);
                }
            });
        });
    }
}
