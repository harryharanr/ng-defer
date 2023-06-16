import { Directive, Input, TemplateRef, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core';
import { IdleQueue } from './idle-queue';
import { HIGH_PRIORITY, LOW_PRIORITY } from './priority-queue';
import { IdleQueueService } from './defer.service';

@Directive({
  selector: '[defer]',
  providers: [IdleQueueService]
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
  @Input() onIntersection: boolean;
  private observer: IntersectionObserver;
  priority: number;

  constructor(private tpl: TemplateRef<any>, private vc: ViewContainerRef, private idleQueue: IdleQueueService) {}

  ngAfterViewInit() {
    if (this.onIntersection) {
      if (this.onIntersection) {
        const options = {
          rootMargin: '0px',
          threshold: 0.1
        };
    
        this.observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadContent();
              this.observer.unobserve(entry.target);
            }
          });
        }, options);
    
        this.observer.observe(this.tpl.elementRef.nativeElement)
      }
    } else {
      this.idleQueue.scheduleTasks(() => {
        this.loadContent();
      }, this.priority);
    }
   
  }
  
  

  loadContent() {
    this.vc.createEmbeddedView(this.tpl);
  }

  ngOnDestroy() {
    this.idleQueue = null;
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}