import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../Model/loginData.model';
import { ShareDataService } from '../../share-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class LogInComponent implements OnInit {
  loginData: LoginData = {
  email: '',
  password: ''
};
  tempUserLogIn: any;
  loginErrorMsg: string = "";
  password: string = "";
  showPassword: boolean = false;
  constructor(private shareDataService: ShareDataService, private router:Router ) {}

  ngOnInit() {}

  ngOnDestroy(){
    if(this.tempUserLogIn){
      this.tempUserLogIn.unsubscribe()
    }
  }
  // on form submit
  onSubmit(data:any){
    console.log(data)
   this.tempUserLogIn = this.shareDataService.userLogIn(data)
    this.shareDataService.isLoginError.subscribe((isError: any) => {
      if(isError){
        this.loginErrorMsg = "Invalid user!"
      }
    })
  }

  // show/hide password
  onShowHidePassword(passwordInput: HTMLInputElement){
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? "text" : "password";
  }
  onSignup(){
    this.router.navigate(['/signup'])
  }
  // get inputType(): string {
  //   return this.showPassword ? "text" : "password";
  // }
}
