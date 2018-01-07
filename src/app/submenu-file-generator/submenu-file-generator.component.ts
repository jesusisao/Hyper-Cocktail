import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileGeneratorComponent } from '../file-generator/file-generator.component';

@Component({
  selector: 'app-submenu-file-generator',
  templateUrl: './submenu-file-generator.component.html',
  styleUrls: ['./submenu-file-generator.component.scss']
})
export class SubmenuFileGeneratorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([{ outlets: { contentmain: 'file-generator/main' } }]);
  }

}
