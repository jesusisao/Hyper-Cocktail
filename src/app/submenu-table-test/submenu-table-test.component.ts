import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submenu-table-test',
  templateUrl: './submenu-table-test.component.html',
  styleUrls: ['./submenu-table-test.component.scss']
})
export class SubmenuTableTestComponent implements OnInit {

  submenues: Submenu[] = SUBMENUES;
  
  constructor() { }

  ngOnInit() {
  }
}

export interface Submenu {
  id:          number;
  name:        string;
  description: string;
  sortNum:     number;
}

export const SUBMENUES: Submenu[] = [
  { id: 100, name: 'Mat Table Test', description: 'テスト説明文', sortNum: 10},
  { id: 101, name: 'test1', description: 'テスト説明文', sortNum: 11},
  { id: 102, name: 'test2', description: 'テスト説明文', sortNum: 12},
  { id: 103, name: 'test3', description: 'テスト説明文', sortNum: 13},
  { id: 104, name: 'test4', description: 'テスト説明文', sortNum: 14}
]

