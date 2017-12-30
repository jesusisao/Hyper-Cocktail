import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';

import { AngularSplitModule } from 'angular-split';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatSortModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    MatTableTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularSplitModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
