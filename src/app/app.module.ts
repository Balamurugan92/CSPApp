import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DataTableModule } from 'angular2-datatable';
import { CSPComponent } from './csp/csp.component';
import { FileUtil } from './csp/file.util';
import { Constants } from './csp/csp.constants';
import { FormsModule } from '@angular/forms';
@NgModule({
    //put all your modules here
    //The imports key in the context of an @NgModule defines additional modules 
    //that will be imported into the current module
    imports: [
        BrowserModule,
        RouterModule,
        DataTableModule,
        FormsModule      ,
        RouterModule.forRoot(appRoutes, {
            useHash: true
        })
    ],
    // put all your components / directives / pipes here
    declarations: [
        AppComponent,
        CSPComponent,
        
    ],

    // put all your services here
    providers: [
        FileUtil,
        Constants,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
