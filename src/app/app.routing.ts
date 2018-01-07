import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { SubmenuTableTestComponent } from './submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator/submenu-file-generator.component';

import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';
import { InputScreenOfDetailsComponent } from './input-screen-of-details/input-screen-of-details.component';

import { FileGeneratorComponent } from './file-generator/file-generator.component';

// ・メインメニューアイコンを押したときにサブメニューを書き換える
// ・サブメニュー押した時にコンテンツを書き換える
const myRoutes = [
    {
        path: '',
        children: [
            { path: '', component: SubmenuTableTestComponent },
        ]
    },

    { path: 'table-test', component: SubmenuTableTestComponent },
    { path: 'table-test/mat-table-test', component: MatTableTestComponent, outlet: 'contentmain' },
    { path: 'table-test/input-screen-of-details', component: InputScreenOfDetailsComponent, outlet: 'contentmain' },

    { path: 'file-generator', component: SubmenuFileGeneratorComponent },
    { path: 'file-generator/main', component: FileGeneratorComponent, outlet: 'contentmain' },

    { path: '**', component: ErrorComponent },
    { path: '**', component: ErrorComponent, outlet: 'contentmain' },

];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes, { useHash: true }); // useHashtrueにしないと更新時に読み込めなくなる
