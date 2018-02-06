import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoinbaseService } from './services/coinbase/coinbase.service';
import { BinanceService } from './services/binance/binance-service.service';
import { BriefdataComponent } from './components/briefdata/briefdata.component';
import { TotalityComponent } from './components/totality/totality.component';
import { PlpercentagePipe } from './pipes/plpercentage.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BriefdataComponent,
    TotalityComponent,
    PlpercentagePipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    CoinbaseService,
    BinanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
