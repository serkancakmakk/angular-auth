import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app/router';

bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      RouterModule.forRoot(routes)
    )
  ]
})
