import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShopingListService } from '../shopinglist.service';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {

  @ViewChild("form") itemForm:NgForm;
  constructor(private shopingListService:ShopingListService) { }
  editMode=false;
  editingItemIndex: number;
  editedItem:Ingrediant;

  ngOnInit(): void {
    this.shopingListService.startedEditing.subscribe((index)=>{
      this.editingItemIndex = index;
      this.editedItem = this.shopingListService.getIngredient(index);
      this.itemForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
      this.editMode=true
    })
  }

  onItemAdded(){
  //  console.log("Item name is "+this.itemName.nativeElement.value+" And item amount is "+this.itemAmount.nativeElement.value);
  const value = this.itemForm.value
  if(this.editMode){
    this.shopingListService.updateIngredients(this.editingItemIndex, new Ingrediant(value.name, value.amount))
  }else{
    this.shopingListService.addIngredient(new Ingrediant(value.name, value.amount));
  }
  this.editMode=false;
  this.itemForm.reset(); 
   
  }

  clearData(){
    if(this.editMode===true){
      this.itemForm.reset();
      console.log(this.editMode);
      this.editMode=false;  
    }
   // console.log(this.editMode);
    
   
   
  }
  deleteItem(){
    if(this.editingItemIndex !== null){
      this.shopingListService.deleteIngredient(this.editingItemIndex);
      this.itemForm.reset();
    }
    this.editingItemIndex=null;
    
  }

}
