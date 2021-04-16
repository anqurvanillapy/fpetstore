interface Productor {
    readonly queue: Queue;
    notifyP: () => any
    [a: string]: any
}
interface Consumer {
    queue: Queue,
    notifyC: () => any
    [a: string]: any
}
let cid = 0;
let pid = 0;
class Queue {
    private queue: any[] = [];
    private productors: Productor[] = [];
    private consumers: Consumer[] = [];
    constructor() {

    }

    available() {
        return this.queue.length;
    }
    
    addProductor(productor: Productor) {
        this.productors.push(productor);
        return pid++;
    }

    addConsumer(consumer: Consumer) {
        this.consumers.push(consumer);
        return cid++;
    }

    addTask(tasks: any) {
        this.queue = this.queue.concat(tasks);
        this.consumers.forEach(cs => cs.notifyC());
    }

    shiftTask(n: number = 1): any {
        let tasks = this.queue.splice(0, n);
        this.productors.forEach(pd => pd.notifyP());
        return tasks;
    }
}

export { Queue };