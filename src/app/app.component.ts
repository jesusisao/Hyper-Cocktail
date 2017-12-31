import { Component } from '@angular/core';
import { Mainmenu } from './mainmenu';
import { MAINMENUES } from './mainmenues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  mainmenues: Mainmenu[] = MAINMENUES;

  constructor() {}

}
