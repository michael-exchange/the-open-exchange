import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketsService } from '../markets.service';
import { Market } from '../market';
import { Order } from '../order';
import { UsersService } from '../users.service';

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
    private market: MarketsService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order.security_id = +params.id;
      this.getMarketData(+params.id);
    })
    this.order.user = this.userService.getUser();
    this.order.pin = this.userService.getPin();
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

  deleteExposure(): void {
    this.market.deleteExposure(this.order.security_id, { user_id: this.order.user, pin: this.order.pin })
      .subscribe(() => this.getMarketData(this.order.security_id));
  }

}
