import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()


export class BinanceService {

  // headers1 = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type' });

  constructor(private http: Http) { }

  getData() {
    return this.http.get('http://www.api.binance.com/api/v3/ticker/price');
  }
}
