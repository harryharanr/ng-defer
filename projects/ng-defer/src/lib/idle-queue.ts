import { PriorityQueue } from "./priority-queue";
import { requestIdleCallback, cancelIdleCallback } from './request-idle-callback';

export class IdleQueue {
  queue: PriorityQueue;
  isScheduled: boolean;
  idleHandler: any;

  constructor() {
    this.queue = new PriorityQueue();
    this.isScheduled = false;
  }

  scheduleTasks(callbackFn, priority) {
    this.queue.insert(callbackFn, priority);
    this.scheduleIdleTask();
  }

  scheduleIdleTask() {
    if (!this.idleHandler) {
      this.idleHandler = requestIdleCallback((deadline) => {
        this.runTasks(deadline);
      });
    }
  }

  cancelScheduledRun() {
    cancelIdleCallback(this.idleHandler);
    this.idleHandler = null;
  }

  runTasks(deadline) {
    this.cancelScheduledRun();
    if (!this.isScheduled) {
      this.isScheduled = true;
      while (deadline.timeRemaining() > 50 && this.queue.length > 0) {
        let currentNode = this.queue.remove();
        if (currentNode && currentNode.value) {
          currentNode.value();
        }
      }

      this.isScheduled = false;
      if (this.queue.length > 0) {
        this.scheduleIdleTask();
      }
    }
  }
}