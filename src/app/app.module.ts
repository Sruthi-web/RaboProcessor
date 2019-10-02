import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import '../assets/styles';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RecordValidatorComponent } from './shared/components/record-validator/record-validator.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecordValidatorComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}