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
  currentMarket: Market = new Market;
  order: Order = new Order;
  bidask: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private market: MarketsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order.security_id = +params.id;
      this.getMarketData(+params.id);
    })
  }

  // rewrite the getMarket() route instead of finding here
  getMarketData(id: number): void {
    this.market.getAllMarkets().subscribe(result => {
      this.currentMarket = result.find(market => {
        return market.security_id === id;
      });
    })
  }

  addOrder(): void {
    if (this.bidask) this.market.bid(this.order).subscribe(() => this.getMarketData(this.order.security_id))
    else if (this.bidask === false) {
      this.market.ask(this.order).subscribe(() => this.getMarketData(this.order.security_id))
    }
  }

}
