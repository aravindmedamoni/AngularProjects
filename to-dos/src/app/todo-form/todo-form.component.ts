import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, OnDestroy {

  @ViewChild("todoForm") todoForm:NgForm | undefined;

  todoStatuses:string[] = ['pending', 'completed'];
  defaultStatus="pending";

  formValuesSubscription!: Subscription;
  buttonName:string = "Add Todo";
  isUpdate:boolean = false;
  updatingItemIndex!:number;
  
  constructor(private todoService:TodoService, private authService:AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
  this.formValuesSubscription =  this.todoService.seletedItem.subscribe((todo:Todo)=>{
      this.todoForm?.setValue({
        title:todo.title,
        text:todo.text,
        status:todo.status
      })
    });
   this.todoService.isUpdate.subscribe((isUpdate)=>{
    this.buttonName = isUpdate.isUpdating?"Update Todo":"Add Todo";
    this.isUpdate = isUpdate.isUpdating;
    this.updatingItemIndex = isUpdate.id
  });
  }

  onSubmit(){
    //console.log(this.todoForm);
    if(this.isUpdate){
      //console.log("updating item index: "+this.updatingItemIndex);
      this.todoService.updateTodo(this.updatingItemIndex,{title:this.todoForm?.value.title,text:this.todoForm?.value.text, status:this.todoForm?.value.status})
      this.formReset();
    }else{
      this.todoService.addTodo({title:this.todoForm?.value.title,text:this.todoForm?.value.text, status:this.todoForm?.value.status})
     this.formReset();
    }
    
  }

  onCancel(){
    this.formReset();
    this.todoService.isUpdate.next({isUpdating:false,id:null})
  }

  formReset(){
    this.todoForm?.reset({
      status:this.defaultStatus
    })
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.formValuesSubscription.unsubscribe();
  }

}
