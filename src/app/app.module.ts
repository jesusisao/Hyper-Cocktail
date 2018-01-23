import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser/';
import { FormsModule } from '@angular/forms';

import { MY_ROUTES } from './app.routing';

import {
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';


import { AppComponent } from './component/app.component';
import { ErrorComponent } from './component/error/error.component';
import { FileGeneratorComponent } from './component/maincontent/file-generator-main/file-generator.component';
// tslint:disable-next-line:max-line-length
import { InputScreenOfDetailsComponent } from './component/maincontent/table-test-main/input-screen-of-details/input-screen-of-details.component';
import { MatTableTestComponent } from './component/maincontent/table-test-main/mat-table-test/mat-table-test.component';
import { SubmenuTableTestComponent } from './component/submenu/submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './component/submenu/submenu-file-generator/submenu-file-generator.component';
import { WelcomePageComponent } from './component/maincontent/welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MatTableTestComponent,
    FileGeneratorComponent,
    WelcomePageComponent,
    SubmenuTableTestComponent,
    SubmenuFileGeneratorComponent,
    ErrorComponent,
    InputScreenOfDetailsComponent
  ],
  imports: [
    AngularSplitModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MY_ROUTES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
