import { Directive, Input, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { IdleQueue } from './idle-queue';
import { HIGH_PRIORITY, LOW_PRIORITY } from './priority-queue';

@Directive({
  selector: '[defer]'
})
export class NgDeferDirective implements AfterViewInit {
  @Input() set defer(inputPriority: number) {
    if (typeof inputPriority === 'number') {
      if (inputPriority > 3) {
        this.priority = HIGH_PRIORITY;
      } else if (inputPriority < 0) {
        this.priority = LOW_PRIORITY;
      } else {
        this.priority = inputPriority;
      }
    } else {
      throw new Error('Defer Directive - priority should be a number');
    }
  }
  priority: number;
  idleQueue: IdleQueue;

  constructor(private tpl: TemplateRef<any>, private vc: ViewContainerRef) {
    this.idleQueue = new IdleQueue();
  }

  ngAfterViewInit() {
    this.idleQueue.scheduleTasks(() => {
      this.vc.createEmbeddedView(this.tpl);
    }, this.priority);
  } 
}