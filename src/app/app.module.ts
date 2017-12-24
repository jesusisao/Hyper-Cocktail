import { BrowserModule } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
