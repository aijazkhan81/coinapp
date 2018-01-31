import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoinbaseService } from './services/coinbase/coinbase.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CoinbaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
