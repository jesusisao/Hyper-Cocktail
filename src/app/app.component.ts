import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SubmenuService } from './submenu.service';

import { Mainmenu } from './mainmenu';
import { MAINMENUES } from './mainmenues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  mainmenues: Mainmenu[] = MAINMENUES;

  constructor(private submenuService: SubmenuService, private router: Router) {
    submenuService.clickedSubmenu$.subscribe(
      submenuRoute => {
        //route-outletで読み込む
        this.router.navigate([{ outlets: { contentmain: submenuRoute } }]);
      }
    )
  }

}
