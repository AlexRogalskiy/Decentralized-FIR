import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirComponent } from './fir/fir.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';

const appRoutes: Routes = [
    {
        path:"",
        component: FirComponent,
    },
    {
        path: "search",
        component: SearchresultsComponent,
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}