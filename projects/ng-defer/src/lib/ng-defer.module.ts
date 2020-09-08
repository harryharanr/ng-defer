import { NgModule } from '@angular/core';
import { NgDeferDirective } from './ng-defer.directive';



@NgModule({
  declarations: [NgDeferDirective],
  exports: [NgDeferDirective]
})
export class NgDeferModule { }
