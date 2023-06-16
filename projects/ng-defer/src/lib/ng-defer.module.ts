import { NgModule } from '@angular/core';
import { NgDeferDirective } from './ng-defer.directive';
import { IdleQueueService } from './defer.service';

@NgModule({
  declarations: [NgDeferDirective],
  exports: [NgDeferDirective],
  providers:[IdleQueueService]
})
export class NgDeferModule { }
