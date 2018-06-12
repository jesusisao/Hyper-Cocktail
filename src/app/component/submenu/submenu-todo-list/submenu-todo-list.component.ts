import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Submenu } from '@app/class/submenu';

@Component({
  selector: 'app-submenu-todo-list',
  templateUrl: '../submenu.html',
  styleUrls: ['../submenu.scss']
})

export class SubmenuTodoListComponent implements OnInit {

  submenues: Submenu[] = SUBMENUES;

  constructor(private router: Router) { }

  ngOnInit() {
    // コンテンツの初期表示
    this.router.navigate([{ outlets: { maincontent: 'todo-list/main' } }]);
  }

  onclick(routeOfSubmenu: string) {
    this.router.navigate([{ outlets: { maincontent: routeOfSubmenu } }]);
  }

}

export const SUBMENUES: Submenu[] = [
  { id: 100, name: 'Todo List', route: 'todo-list/main', description: 'テスト説明文', sortNum: 10 }
];
