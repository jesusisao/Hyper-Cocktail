import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';
import { DomSanitizer } from '@angular/platform-browser/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MY_ROUTES } from './app.routing';

import {
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

//サービス
import { SubmenuService } from './submenu.service'

import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { ErrorComponent } from './error/error.component';
import { FileGeneratorComponent } from './file-generator/file-generator.component';
import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';
import { SubmenuTableTestComponent } from './submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator/submenu-file-generator.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    MatTableTestComponent,
    FileGeneratorComponent,
    WelcomePageComponent,
    SubmenuTableTestComponent,
    SubmenuFileGeneratorComponent,
    ErrorComponent
  ],
  imports: [
    AngularSplitModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MY_ROUTES,
  ],
  providers: [SubmenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
