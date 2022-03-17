import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
 export class AuthService{
    user = new BehaviorSubject<User>(null);
    clearExprireDuration:any;
     constructor(private http:HttpClient, private router:Router){}

     signUp(email:string, password:string){
         return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAuthKey,
         {
             email:email,
             password:password,
             returnSecureToken:true
         }).pipe(catchError(this.handelError), tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
         }));
     }

     autoLogin(){
         const userData:{
             email:string,
             userId:string,
             _token:string,
             _tokenExpirationDate:string
         } = JSON.parse(localStorage.getItem('userData'));

         if(!userData){
             return;
         }
         const loadedUSer = new User(userData.email,userData.userId,userData._token,new Date(userData._tokenExpirationDate))
         if(loadedUSer.token){
             this.user.next(loadedUSer);
             const expireDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
             this.autoLogout(expireDuration);
         }
     }

     logout(){
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if(this.clearExprireDuration){
            clearTimeout(this.clearExprireDuration);
        }
        this.clearExprireDuration=null;

    }

     autoLogout(expiresDuration:number){
        this.clearExprireDuration = setTimeout(()=>{
             this.logout();
         },expiresDuration)
     }

     signIn(email:string,password:string){
        return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAuthKey,{
             email:email,
             password:password,
             returnSecureToken:true
         }).pipe(
             catchError(this.handelError), tap(resData=>{
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                  );
             })
         );
     }

     //Handling the error comming from the response
     handelError(errorResp:HttpErrorResponse){
         console.log("Handle Error Called");
         
        let errorMessage = "An unknown Error occurred.."
        if(!errorResp.error || !errorResp.error.error){
            return throwError(errorMessage);
        }else{
            switch(errorResp.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email is already exist.'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Credetials not matched..'
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage="Email not found.."
                    break;
            }
            console.log(`Error message: ${errorMessage}`);
            
            return throwError(errorMessage);
        }
     }

     private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000)
        localStorage.setItem('userData',JSON.stringify(user));
      }

     
 }