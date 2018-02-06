import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()


export class CoinbaseService {

  constructor(private http: Http) { }

  getData(test) {
    var test = test.toUpperCase();
    return this.http.get(`https://api.coinbase.com/v2/prices/${test}-USD/buy`);
  }


}
