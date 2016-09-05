import {Component} from '@angular/core';

@Component({
  selector: 'app',
  styles: [require('./app.styl').toString()],
  template: require('./app.jade')(),
})
export class AppComponent {}
