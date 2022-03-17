import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertDialogueComponent } from '../shared/alert-dialogue/alert-dialogue.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authForm:NgForm;

  isLoginMode = true;
  isLoading:boolean = false;
  error:string = null;

  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
  containerRefSub:Subscription;

  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  okButton(){
    this.error=null;
  }

  onSubmit(){
    // console.log(this.authForm.value);
    this.isLoading = true;
    this.error=null;

    let authObs : Observable<AuthResponseData>;
   

    if(this.authForm.invalid){
      return;
    }
    let email = this.authForm.value.email;
    let password = this.authForm.value.password;
    if(this.isLoginMode){
      console.log("Login Request");
      authObs=this.authService.signIn(email,password);
    }else{
      authObs=this.authService.signUp(email,password);
    }

    authObs.subscribe((responseData)=>{
     // console.log(responseData);
      this.router.navigate(['/recipies']);
      this.isLoading=false;
      
      
    },errorMessage=>{
      this.isLoading=false;
      this.error = errorMessage;
      this.showErrorDialogue(errorMessage);
      console.log(errorMessage);
      
    })
   
    this.authForm.reset();
    
  }

  showErrorDialogue(message:string){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertDialogueComponent);
    const viewContainerRef = this.alertHost.viewContainerREf;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.containerRefSub =componentRef.instance.close.subscribe(()=>{
      this.containerRefSub.unsubscribe();
      viewContainerRef.clear();
    })

  }


  closeAlert(){
    this.error=null;
  }

  ngOnDestroy(){
    if(this.containerRefSub){
      this.containerRefSub.unsubscribe();
    }
  }
}
