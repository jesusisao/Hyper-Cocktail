import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { SubmenuTableTestComponent } from './submenu-table-test/submenu-table-test.component';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator/submenu-file-generator.component';

const myRoutes = [
    { path: 'table-test', component: SubmenuTableTestComponent },
    { path: 'file-generator', component: SubmenuFileGeneratorComponent },
    { path: '**', component: ErrorComponent },
]

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);