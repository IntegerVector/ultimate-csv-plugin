// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Papa from 'papaparse';

export class CSV {
    public static parse(text: string): Promise<string[][]> {
        // for stupid Excel:
        if (text.charCodeAt(0) === 0xFEFF) {
            text = text.slice(1);
        }

        return new Promise((resolve, reject) => {
            Papa.parse(text, {
                header: false,
                complete: (res: { data: string[][] }) => {
                    resolve(res.data);
                },
                error: (err: Papa.ParseError) => {
                    reject(err);
                }
            });
        });
    }

    public static stringify(data: string[][]): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const textData: string = Papa.unparse(data);
                resolve(textData);
            } catch (e) {
                reject(e);
            }
        });
    }
}
