import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './component/common/error/error.component';
import { SubmenuTableTestComponent } from './component/submenu/submenu-table-test/submenu-table-test.component';

import { SubmenuFileGeneratorComponent } from './component/submenu/submenu-file-generator/submenu-file-generator.component';
import { MatTableTestComponent } from './component/maincontent/test-main/mat-table-test/mat-table-test.component';
// tslint:disable-next-line:max-line-length
import { InputScreenOfDetailsComponent } from './component/maincontent/test-main/input-screen-of-details/input-screen-of-details.component';
// tslint:disable-next-line:max-line-length
import { InputScreenOfDetails2Component } from './component/maincontent/test-main/input-screen-of-details2/input-screen-of-details2.component';

import { FileGeneratorComponent } from './component/maincontent/file-generator-main/file-generator.component';
import { ZipcodeTestComponent } from './component/maincontent/zipcode-test/zipcode-test.component';

// ・メインメニューアイコンを押したときにサブメニューを書き換える
// ・サブメニュー押した時にコンテンツを書き換える
const myRoutes = [
    {
        path: '',
        children: [
            { path: '', component: SubmenuTableTestComponent },
        ]
    },

    { path: 'test', component: SubmenuTableTestComponent },
    { path: 'test/mat-table-test', component: MatTableTestComponent, outlet: 'maincontent' },
    { path: 'test/input-screen-of-details', component: InputScreenOfDetailsComponent, outlet: 'maincontent' },
    { path: 'test/input-screen-of-details2', component: InputScreenOfDetails2Component, outlet: 'maincontent' },
    { path: 'test/zipcode-test', component: ZipcodeTestComponent, outlet: 'maincontent' },

    { path: 'file-generator', component: SubmenuFileGeneratorComponent },
    { path: 'file-generator/main', component: FileGeneratorComponent, outlet: 'maincontent' },

    { path: '**', component: ErrorComponent },
    { path: '**', component: ErrorComponent, outlet: 'maincontent' },

];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes, { useHash: true }); // useHashtrueにしないと更新時に読み込めなくなる
