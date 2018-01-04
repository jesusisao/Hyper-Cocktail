import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { SubmenuTableTestComponent } from './submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator/submenu-file-generator.component';

import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';

//メインメニューアイコンを押したときにサブメニューを書き換える
const myRoutes = [
    { path: '', component: SubmenuTableTestComponent },
    { path: 'table-test', component: SubmenuTableTestComponent },
    { path: 'file-generator', component: SubmenuFileGeneratorComponent },
    { path: '**', component: ErrorComponent },
    { path: 'table-test/mat-table-test', component: MatTableTestComponent, outlet: 'contentmain' },
    { path: '**', component: ErrorComponent, outlet: 'contentmain' },
]

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);