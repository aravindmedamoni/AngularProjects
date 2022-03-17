import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{
  isLoginSub! : Subscription;

  isLogin:boolean = false;
  constructor(private authService:AuthService, private router:Router){}
  ngOnInit(): void {
    this.isLoginSub = this.authService.isLogin.subscribe(isLogin=>{
      this.isLogin = isLogin;
      console.log(`islogin is: ${isLogin}`);
      if(!this.isLogin){
        this.router.navigate(["auth"])
      }else{
        this.router.navigate([""])
      }
      //this.router.navigate([""])
    })
    if(!this.isLogin){
      this.authService.logout();
    }
  }
  title = 'to-dos';

  ngOnDestroy(){
    
    this.isLoginSub.unsubscribe();
  }
  
}
