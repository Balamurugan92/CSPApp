import { Routes, RouterModule } from '@angular/router';
import {CSPComponent} from './csp/csp.component';


export const appRoutes: Routes = [
    { 
        path: 'roboStatement', 
        component: CSPComponent,
    },
    { 
        path: '', 
        component: CSPComponent, 
    }
];
