import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:string;

  constructor(private user:UsersService) { }

  ngOnInit() {
  }

  addUser(username:string) {
    this.user.createUser(username).subscribe(() => this.username = '');
  }

}
