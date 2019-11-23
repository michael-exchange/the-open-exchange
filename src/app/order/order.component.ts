import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketsService } from '../markets.service';
import { Market } from '../market';
import { Order } from '../order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentMarket:Market = new Market;
  order: Order = new Order;
  bidask: boolean;

  constructor(private route:ActivatedRoute, private market:MarketsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order.security_id = params.id;
      this.market.getMarket(params.id).subscribe(result => {
        this.currentMarket = result;
      })
    })
  }

}
