import { Queue } from './queue';
class Coroutine {
    private _queue: Queue = new Queue();
    private _count: number;
    private running: boolean = false;
    get queue() {
        return this._queue;
    };

    constructor(count: number = 5) {
        this._queue.addProductor(this);
        this._queue.addConsumer(this);
        this._count = count;
    }

    addTask(tasks: Array<() => any> | (() => any)) {
        this.queue.addTask(tasks);
    }

    notifyP() {

    }

    notifyC() {
        if (this.running) return;
        this.running = true;

        setTimeout(this.run.bind(this), 0);
    }

    private run() {
        let tasks = this._queue.shiftTask(this._count);
        tasks.forEach((task: () => any) => task());
        if (this._queue.available()) {
            setTimeout(this.run.bind(this), 0);
        } else {
            this.running = false;
        }
    }
    //TODO: 添加使用实时运行时间判断队列清除速度
}

export { Coroutine };