/**
 * Simple realization of rxjs Subject object
 */
export class Subject<T> {
    private subscribers: { (data: T): void }[] = [];

    public next(data: T): void {
        this.subscribers.forEach(callBack => {
            callBack(data);
        });
    }

    public subscribe(callBack: { (data: T): void }): void {
        this.subscribers.push(callBack);
    }

    public clearAll(): void {
        this.subscribers.length = 0;
    }
}
