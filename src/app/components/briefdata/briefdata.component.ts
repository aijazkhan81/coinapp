import { Component, Input, OnInit } from '@angular/core';

import { CoinbaseService } from './../../services/coinbase/coinbase.service';

@Component({
  selector: 'app-briefdata',
  templateUrl: './briefdata.component.html',
  styleUrls: ['./briefdata.component.less']
})
export class BriefdataComponent implements OnInit {
  @Input() list;
  @Input() showHeader;
  @Input() total;

  getPercentage(coinWorth, moneySpent) {
    var percentage = (coinWorth - moneySpent) / moneySpent * 100;
    return percentage;
  }

  constructor(public CoinbaseService: CoinbaseService) { }

  ngOnInit() {

  }

}
