import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { CoinbaseService } from './services/coinbase/coinbase.service';
import { BinanceService } from './services/binance/binance-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  coins_list = [
    {
      coin: 'btc',
      buying: [
        {
          priceBought: 13180.59,
          amountBought: 0.04485309
        },
        {
          priceBought: 14000,
          amountBought: 0.0043
        },
        {
          priceBought: 10501.73,
          amountBought: 0.037530
        },
        {
          priceBought: 8788.95,
          amountBought: 0.0560545
        },
        {
          priceBought: 8789.18,
          amountBought: -0.006345
        },
        {
          priceBought: 8794.99,
          amountBought: -0.00481
        },
        {
          priceBought: 8792.67,
          amountBought: -0.015407
        },
        {
          priceBought: 8809.24,
          amountBought: -0.014274
        },
        {
          priceBought: 8792,
          amountBought: -0.00602488
        },
        {
          priceBought: 8801.02,
          amountBought: -0.00317
        }
      ]
    },
    {
      coin: 'eth',
      buying: [
        {
          priceBought: 836.11,
          amountBought: 0.05742069
        },
        {
          priceBought: 748.72,
          amountBought: 0.52640155
        }
      ]
    },
    {
      coin: 'ltc',
      buying: [
        {
          priceBought: 372.66,
          amountBought: 0.12882917
        },
        {
          priceBought: 176.23,
          amountBought: 1
        },
        {
          priceBought: 126.69,
          amountBought: 1
        }
      ]
    },
  ];

  binanceCoins = [
    {
      coin: 'XLM',
      buying: [
        {
          priceBought: 0.579517,
          amountBought: 235
        },
        {
          priceBought: 0.563126,
          amountBought: 87
        },
        {
          priceBought: 0.419144,
          amountBought: 299.7
        },
        {
          priceBought: 0.417092,
          amountBought: 126.84
        },
      ]
    },
    {
      coin: 'XRP',
      buying: [
        {
          priceBought: 1.6,
          amountBought: 74
        },
        {
          priceBought: 1.34,
          amountBought: 81
        },
        {
          priceBought: 0.903095,
          amountBought: 149.84
        }
      ]
    },
    {
      coin: 'ADA',
      buying: [
        {
          priceBought: 0.751033,
          amountBought: 100
        },
        {
          priceBought: 0.371782,
          amountBought: 149.85
        }
      ]
    },
    {
      coin: 'XVG',
      buying: [
        {
          priceBought: 0.088705,
          amountBought: 250
        },
        {
          priceBought: 0.055798,
          amountBought: 499.5
        }
      ]
    },
    {
      coin: 'TRX',
      buying: [
        {
          priceBought: 0.042304,
          amountBought: 999
        }
      ]
    }
  ]

  totality = {
    totalUsdSpent: 0,
    totalCoinsWorth: 0,
    percentage: 0
  }

  user_list = [];

  constructor(private CoinbaseService: CoinbaseService, private BinanceService: BinanceService) { }

  addingTotality = (listName) => {
    for (let index = 0; index < listName.length; index++) {
      this.totality.totalUsdSpent = this.totality.totalUsdSpent + listName[index].totalInvestment;
      this.totality.totalCoinsWorth = this.totality.totalCoinsWorth + listName[index].currentWorth;
      this.totality.percentage = (this.totality.totalCoinsWorth - this.totality.totalUsdSpent) / this.totality.totalUsdSpent * 100;
    }
  }

  cBsuccessCallback = (response) => {
    if (response.status == 200) {
      response._body = JSON.parse(response._body);
      response.coin = response._body.data.base;
      response.currentPrice = response._body.data.amount;

      var coinName = response._body.data.base.toLowerCase();
      var filteredCoin = this.coins_list.filter((el) => el.coin == coinName);
      var totalInvestment = 0;
      var totalHolding = 0;
      var currentWorth = 0;
      var profitLoss = 0;

      for (let index = 0; index < filteredCoin[0].buying.length; index++) {
        var moneyInvested, tax;
        var el = filteredCoin[0].buying[index];

        moneyInvested = (el.priceBought * el.amountBought);
        tax = (4 / 100) * moneyInvested;
        currentWorth = currentWorth + (el.amountBought * response._body.data.amount);

        moneyInvested = tax + moneyInvested;
        totalInvestment = totalInvestment + moneyInvested;
        totalHolding = totalHolding + el.amountBought;
      }

      response.totalInvestment = totalInvestment;
      response.totalHolding = totalHolding;
      response.currentWorth = currentWorth;
      response.profitLoss = (currentWorth - totalInvestment);

      this.user_list.push(response);

      this.totality.totalCoinsWorth = 0;
      this.totality.totalUsdSpent = 0;

      this.addingTotality(this.user_list);
      this.CoinbaseService.hideSpinnerFn();
    }
  }

  cBerrorCallback = (error) => {
    console.log(error);
  }

  getCoinbasePrices(coin) {
    this.CoinbaseService.getData(coin).subscribe(
      this.cBsuccessCallback,
      this.cBerrorCallback
    );
  }


  // Coinbase complete


  // Binance start

  biSuccessCallback = (response) => {
    if (response.status == 200 && response._body.length > 3) {
      response._body = JSON.parse(response._body);
      var newArray = response._body.filter((item) => item.symbol.includes('BTC'))

      for (let index = 0; index < this.binanceCoins.length; index++) {
        var el: any = this.binanceCoins[index];
        // el is Coin from my array XLM

        var binData = newArray.filter((coin) => coin.symbol.includes(el.coin));
        var USDT = newArray.filter((coin) => coin.symbol.includes('BTCUSDT'))[0].price;

        var totalHolding = 0;
        var totalInvestment = 0;
        var currentWorth = 0;
        var profitLoss = 0;

        for (let index = 0; index < el.buying.length; index++) {
          var deepEl = el.buying[index];

          totalInvestment = totalInvestment + (deepEl.priceBought * deepEl.amountBought);
          totalHolding = totalHolding + deepEl.amountBought;
        }

        currentWorth = totalHolding * binData[0].price * USDT;

        el.totalInvestment = totalInvestment;
        el.totalHolding = totalHolding;
        el.currentWorth = currentWorth;
        el.profitLoss = (currentWorth - totalInvestment);
        el.currentPrice = binData[0].price * USDT;
        this.user_list.push(el)
      }

      this.addingTotality(this.user_list);
    }
    else {
      console.log('Empty array returned from binance');
    }
  }

  biErrorCallback = (error) => {
    console.log('Binance service failed');
    console.log(error);
  }

  // Binance end


  ngOnInit() {
    for (let index = 0; index < this.coins_list.length; index++) {
      this.getCoinbasePrices(this.coins_list[index].coin);
    }

    this.BinanceService.getData().subscribe(
      this.biSuccessCallback, this.biErrorCallback
    )
  }

}
