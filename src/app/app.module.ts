import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { AngularSplitModule } from 'angular-split';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser/';
import { FormsModule } from '@angular/forms';

import { ColoredDirective } from './directive/colored.directive';
import { MY_ROUTES } from './app.routing';

import { ZipcodeService } from './service/zipcode.service';

import {
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

import { AppComponent } from './component/app.component';
import { ErrorComponent } from './component/common/error/error.component';
import { FileGeneratorComponent } from './component/maincontent/file-generator-main/file-generator.component';
// tslint:disable-next-line:max-line-length
import { InputScreenOfDetailsComponent } from './component/maincontent/test-main/input-screen-of-details/input-screen-of-details.component';
import { MatTableTestComponent } from './component/maincontent/test-main/mat-table-test/mat-table-test.component';
import { SubmenuTableTestComponent } from './component/submenu/submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './component/submenu/submenu-file-generator/submenu-file-generator.component';
import { WelcomePageComponent } from './component/maincontent/welcome-page/welcome-page.component';
import { ZipcodeTestComponent } from './component/maincontent/zipcode-test/zipcode-test.component';
import { ZipValidator } from './directive/zip.validator';
import { DetailsTableComponent } from './component/common/details-table/details-table.component';
// tslint:disable-next-line:max-line-length
import { InputScreenOfDetails2Component } from './component/maincontent/test-main/input-screen-of-details2/input-screen-of-details2.component';

@NgModule({
  declarations: [
    AppComponent,
    MatTableTestComponent,
    FileGeneratorComponent,
    WelcomePageComponent,
    SubmenuTableTestComponent,
    SubmenuFileGeneratorComponent,
    ErrorComponent,
    InputScreenOfDetailsComponent,
    ColoredDirective,
    ZipcodeTestComponent,
    ZipValidator,
    DetailsTableComponent,
    InputScreenOfDetails2Component,
  ],
  imports: [
    AngularSplitModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MY_ROUTES,
  ],
  providers: [ZipcodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
