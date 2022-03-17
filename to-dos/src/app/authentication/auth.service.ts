import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:"root"})
export class AuthService{

    constructor(private http:HttpClient){}

    isLogin : Subject<boolean> = new Subject<boolean>();

    login(user:User){
        
       return this.http.post<AuthResponseData>("http://localhost:3000/api/auth/login",user);
    }

    register(user:User){
        return this.http.post<AuthResponseData>("http://localhost:3000/api/auth/register",user);
    }

    autoLogin(){
       let token = localStorage.getItem('token');
       if(token){
           this.isLogin.next(true)
       }else{
           this.isLogin.next(false);
       }
    }

    logout(){
        console.log("logout");
        localStorage.removeItem('token');
        this.isLogin.next(false);
    }
}

export interface User{
    username?:string,
    email:String,
    password:String
}

export interface AuthResponseData{
    message:string,
    success:boolean,
    token?:string,
    data?: User
}