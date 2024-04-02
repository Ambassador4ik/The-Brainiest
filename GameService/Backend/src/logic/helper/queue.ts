export default class Queue<T> {
    private readonly storage: T[] = [];

    constructor(initialElements: T[] = []) {
        this.storage = initialElements;
    }

    enqueue(item: T): void {
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            console.error("Attempting to dequeue from an empty queue");
            return undefined;
        }
        return this.storage.shift();
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            console.error("Attempting to peek from an empty queue");
            return undefined;
        }
        return this.storage[0];
    }

    size(): number {
        return this.storage.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }
}