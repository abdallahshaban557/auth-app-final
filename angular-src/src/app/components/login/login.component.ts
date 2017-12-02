import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
//import {FlashMessagesService} from 'angular2-flash-messages';
import {FlashMessagesService} from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Welcome ' + this.username, {
          //cssClass: 'alert-success',
          classes: ['alert-success'],
          timeout: 5000});
        this.router.navigate(['home']);
      } else {
        console.log(false);
        this.flashMessage.show(data.msg, {
          //cssClass: 'alert-danger',
          classes: ['alert-danger'],
          timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}
