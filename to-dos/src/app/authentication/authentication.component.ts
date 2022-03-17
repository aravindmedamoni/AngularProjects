import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('authForm') authForm!:NgForm;

  constructor(private authService:AuthService) { }

  isLoginMode = true;

  ngOnInit(): void {
  }

  onSubmit(){
    // console.log(`IsLogin ${this.isLoginMode}`);
    
    // console.log(this.authForm.value);
    //this.authService.isLogin.next(true);
    if(this.isLoginMode){
      this.authService.login(this.authForm.value).subscribe(responseData=>{
        console.log(responseData);
        if(responseData.success){
          this.authService.isLogin.next(true);
          localStorage.setItem('token',responseData.token!)
        }else{
          console.log(responseData.message);
        }
        
      });
    }else{
      this.isLoginMode=true;
      this.authService.register(this.authForm.value).subscribe(responseData=>{
        console.log(responseData);
        if(responseData.success){
          this.authService.isLogin.next(true);
          localStorage.setItem('token',responseData.token!)
        }else{
          console.log(responseData.message);
        }
      });
    }
    
    
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode
  }

}
