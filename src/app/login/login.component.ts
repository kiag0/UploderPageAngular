import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  waiting = true;
  serverMessage: string;
  buttonText = 'Sign In';

  constructor(public authProvider: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.valid === false) {
      return;
    }
    this.isLoading = true;
    this.buttonText = 'loading';
    console.log(form.value.phone);
    if(form.value.phone !== '0703436696') {
      this.authProvider.loginFailed();
      this.isLoading = false;
      this.buttonText = 'Sign In';
      return;
    } else {
      this.authProvider.pushUploadPage();
    }


  }

}
