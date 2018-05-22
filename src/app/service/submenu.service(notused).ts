import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SubmenuService {

  private clickedSubmenuSource = new Subject<string>();

  // こいつを外からsubscribeする
  clickedSubmenu$ = this.clickedSubmenuSource.asObservable();

  // 外からObservableにデータを流し込む
  sendSubmenuRoute(submenuRoute: string) {
    this.clickedSubmenuSource.next(submenuRoute);
  }

}
