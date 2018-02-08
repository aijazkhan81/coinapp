import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()


export class CoinbaseService {
  public showSpinner: boolean = false;

  constructor(private http: Http) { }

  getData(test) {
    this.showSpinnerFn();
    var test = test.toUpperCase();
    return this.http.get(`https://api.coinbase.com/v2/prices/${test}-USD/buy`);
  }

  showSpinnerFn() {
    this.showSpinner = true;
  }

  hideSpinnerFn() {
    this.showSpinner = false;
  }


}
