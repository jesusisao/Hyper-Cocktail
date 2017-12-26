import { BrowserModule } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';


@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
