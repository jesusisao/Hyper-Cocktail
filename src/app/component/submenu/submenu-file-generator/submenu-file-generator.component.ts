import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Submenu } from '@app/class/submenu';

@Component({
  selector: 'app-submenu-file-generator',
  templateUrl: '../submenu.html',
  styleUrls: ['../submenu.scss']
})
export class SubmenuFileGeneratorComponent implements OnInit {

  submenues: Submenu[] = SUBMENUES;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([{ outlets: { maincontent: 'file-generator/main' } }]);
  }

  onclick(routeOfSubmenu: string) {
    this.router.navigate([{ outlets: { maincontent: routeOfSubmenu } }]);
  }

}

export const SUBMENUES: Submenu[] = [
  { id: 100, name: 'File Generator', route: 'file-generator/main', description: 'テスト説明文', sortNum: 10 }
];
