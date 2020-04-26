import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:string;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    if (!this.user) this.router.navigateByUrl('/');
  }

  logOut() {
    this.userService.logOut();
    location.reload();
  }

}
