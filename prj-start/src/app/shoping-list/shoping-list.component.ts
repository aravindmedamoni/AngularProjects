import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShopingListService } from './shopinglist.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {

 // ingredients :Observable<{ingredients:Ingrediant[]}>;
  ingredients:Ingrediant[];
  igChangedSubscription : Subscription;

  constructor(private shopingListService:ShopingListService) { }
  ngOnDestroy(): void {
    this.igChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //  this.ingredients=this.store.select('shopingList');
    this.ingredients=this.shopingListService.getIngredients();
    this.igChangedSubscription = this.shopingListService.ingredientsChanged.subscribe((ingredients:Ingrediant[])=>{
      this.ingredients = ingredients;
    })
    console.log(this.ingredients);
    
  }

  editItemAt(id:number){
    this.shopingListService.startedEditing.next(id);
  }

}
