# Ng-Defer

ng-defer directive makes the component to be rendered during Idle time. Optionally pass priority to the directive to load components based on priority.

### Features
  - Defer the rendering of the expensive component. Expensive component will be loaded during idle time. 
  - Time to interactive for the main component will be reduced.

### Installation

Install the library using
```
$ npm install --save ng-defer
```
Import it in your module
```
$ import { NgDeferModule } from 'ng-defer';
```
Make sure to add NgDeferModule to the imports.

Add `*defer` to the component that needs to be loaded at browser idle time.