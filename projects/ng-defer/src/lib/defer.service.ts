import { Injectable } from "@angular/core";
import { IdleQueue } from "./idle-queue";

@Injectable({
  providedIn: 'root',
 })
export class IdleQueueService {
  private idleQueue: IdleQueue = new IdleQueue();

  constructor() { }
 
  scheduleTasks(callback, priority) {
    this.idleQueue.scheduleTasks(callback, priority);
  }
}