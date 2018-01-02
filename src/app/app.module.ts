import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { FileGeneratorComponent } from './file-generator/file-generator.component';
import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SubmenuTableTestComponent } from './submenu-table-test/submenu-table-test.component';

import { AngularSplitModule } from 'angular-split';
import { DomSanitizer } from '@angular/platform-browser/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    MatTableTestComponent,
    FileGeneratorComponent,
    WelcomePageComponent,
    SubmenuTableTestComponent
  ],
  imports: [
    AngularSplitModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
