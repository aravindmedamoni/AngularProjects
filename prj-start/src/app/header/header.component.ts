import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated:boolean = false;
  userSubscription : Subscription;

  constructor(private dataStrgService:DataStorageService, private authService:AuthService) { }

  ngOnInit(): void {
   this.userSubscription = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      // console.log(user.token);
      // console.log(!!user);
      // console.log(user);
    })
  }

  onSave(){
    this.dataStrgService.saveRecipes();
  }

  onFetch(){
    this.dataStrgService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
