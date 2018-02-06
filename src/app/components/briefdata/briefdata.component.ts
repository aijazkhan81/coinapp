import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-briefdata',
  templateUrl: './briefdata.component.html',
  styleUrls: ['./briefdata.component.less']
})
export class BriefdataComponent implements OnInit {
  @Input() list;
  @Input() binList;
  @Input() showHeader;
  @Input() total;

  getPercentage(coinWorth, moneySpent) {
    var percentage = (coinWorth - moneySpent) / moneySpent * 100;
    return percentage;
  }

  constructor() { }

  ngOnInit() {

  }

}
