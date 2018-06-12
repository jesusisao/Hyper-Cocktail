import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Submenu } from '@app/class/submenu';

@Component({
  selector: 'app-submenu-table-test',
  templateUrl: '../submenu.html',
  styleUrls: ['../submenu.scss']
})
export class SubmenuTableTestComponent implements OnInit {

  submenues: Submenu[] = SUBMENUES;

  constructor(private router: Router) { }

  onclick(routeOfSubmenu: string) {
    this.router.navigate([{ outlets: { maincontent: routeOfSubmenu } }]);
  }

  ngOnInit() {
    // コンテンツの初期表示
    this.router.navigate([{ outlets: { maincontent: 'test/mat-table-test' } }]);
  }

}

export const SUBMENUES: Submenu[] = [
  { id: 100, name: 'Mat Table Test', route: 'test/mat-table-test', description: 'テスト説明文', sortNum: 10 },
  { id: 101, name: 'Input Screen Of Details', route: 'test/input-screen-of-details', description: 'テスト説明文', sortNum: 11 },
  { id: 102, name: 'Input Screen Of Details 2', route: 'test/input-screen-of-details2', description: 'テスト説明文', sortNum: 12 },
  { id: 103, name: 'Zipcode Test', route: 'test/zipcode-test', description: 'テスト説明文', sortNum: 13 },
  { id: 104, name: 'test3', route: 'test/other-table-test', description: 'テスト説明文', sortNum: 14 },
  { id: 105, name: 'test4', route: 'test/other-table-test', description: 'テスト説明文', sortNum: 15 }
];

