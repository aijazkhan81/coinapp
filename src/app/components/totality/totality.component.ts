import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-totality',
  templateUrl: './totality.component.html',
  styleUrls: ['./totality.component.less']
})
export class TotalityComponent implements OnInit {
  @Input() numbers;

  constructor() { }

  ngOnInit() {
  }

}
