import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Mainmenu } from '../class/mainmenu';
import { MAINMENUES } from '../class/mainmenues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  mainmenues: Mainmenu[] = MAINMENUES;

  constructor() {}

}
