import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MainComponentModule } from './folder/folder.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,

    FormsModule,
    MainComponentModule,
    IonicModule.forRoot(),
    AppRoutingModule,],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
