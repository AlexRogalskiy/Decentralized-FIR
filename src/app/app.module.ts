import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Web3Service } from './util/web3.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app.router";

import { FirComponent } from './fir/fir.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';

import { IpfsService } from './util/ipfs.service';

@NgModule({
  declarations: [
    AppComponent,
    FirComponent,
    SearchboxComponent,
    SearchresultsComponent
  ],
  imports: [
    // BrowserAnimationsModule,
    // CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [Web3Service, IpfsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
