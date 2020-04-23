import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:string;
  pin:string;
  error:boolean = false;

  constructor(private userService:UsersService, private router:Router) { }

  ngOnInit() {
  }

  addUser() {
    this.userService.createUser(this.user, this.pin).subscribe();
  }

  login() {
    this.userService.verifyUser(this.user, this.pin).subscribe(result => {
      if (!result) this.error = true;
      else {
        this.userService.setCredentials(this.user, this.pin);
        this.router.navigateByUrl('/markets');
      }
    })
  }

}
