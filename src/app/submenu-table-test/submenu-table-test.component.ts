import { Component } from '@angular/core';
import { SubmenuService } from '../submenu.service';

@Component({
  selector: 'app-submenu-table-test',
  templateUrl: './submenu-table-test.component.html',
  styleUrls: ['./submenu-table-test.component.scss']
})
export class SubmenuTableTestComponent {

  submenues: Submenu[] = SUBMENUES;

  constructor(private submenuService: SubmenuService) { }

  onclick(routeOfSubmenu: string) {
    this.submenuService.sendSubmenuRoute(routeOfSubmenu);
  }
}

export interface Submenu {
  id: number;
  name: string;
  route: string;
  description: string;
  sortNum: number;
}

export const SUBMENUES: Submenu[] = [
  { id: 100, name: 'Mat Table Test', route: 'table-test/mat-table-test', description: 'テスト説明文', sortNum: 10 },
  { id: 101, name: 'test1', route: 'table-test/other-table-test', description: 'テスト説明文', sortNum: 11 },
  { id: 102, name: 'test2', route: 'table-test/other-table-test', description: 'テスト説明文', sortNum: 12 },
  { id: 103, name: 'test3', route: 'table-test/other-table-test', description: 'テスト説明文', sortNum: 13 },
  { id: 104, name: 'test4', route: 'table-test/other-table-test', description: 'テスト説明文', sortNum: 14 }
]

