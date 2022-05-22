/**
 * Simple realization of rxjs Subject object
 */
export class Subject<T> {
    private subscribers: { (data: T): void }[] = [];

    public next(data: T): Subject<T> {
        this.subscribers.forEach(callBack => {
            callBack(data);
        });
        return this;
    }

    public subscribe(callBack: { (data: T): void }): Subject<T> {
        this.subscribers.push(callBack);
        return this;
    }

    public clearAll(): void {
        this.subscribers.length = 0;
    }
}
