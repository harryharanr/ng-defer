import { Directive, Input, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { IdleQueue } from './idle-queue';
import { HIGH_PRIORITY } from './priority-queue';

@Directive({
  selector: '[defer]'
})
export class NgDeferDirective implements AfterViewInit {
  @Input() priority: any = HIGH_PRIORITY;
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