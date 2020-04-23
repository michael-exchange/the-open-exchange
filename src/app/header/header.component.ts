import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:string;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

}
