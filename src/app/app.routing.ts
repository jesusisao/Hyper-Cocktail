import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { SubmenuTableTestComponent } from './submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator/submenu-file-generator.component';

import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';

//メインメニューアイコンを押したときにサブメニューを書き換える
const myRoutes = [
    { path: '', component: SubmenuFileGeneratorComponent },
    { path: 'table-test', component: SubmenuTableTestComponent },
    { path: 'table-test/mat-table-test', component: MatTableTestComponent, outlet: 'content-main' },
    { path: 'table-test/**', component: ErrorComponent, outlet: 'content-main' },
    { path: 'file-generator', component: SubmenuFileGeneratorComponent },
    { path: '**', component: ErrorComponent },
]

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);