import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {

 

  todos:Todo[] = []//[{title:"Aravind",text:"My name is aravind", status:"alive"},{title:"avi",text:"My name is avi", status:"alive"}];
  todosSubscription : Subscription | undefined;
  itemIndex!:number;
  itemIndexSubscription!:Subscription;
  isLoading:boolean = true;
  isLoadingSubscription!:Subscription;

  constructor(private todoService:TodoService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.todos=this.todoService.getTodos();
    
   this.isLoading = this.todos.length!==0;
   this.todosSubscription = this.todoService.latestTodos.subscribe((todos:Todo[])=>{
      this.todos = todos;
    
    })
   this.itemIndexSubscription = this.todoService.isUpdate.subscribe(isUpdate=>{
      this.itemIndex = isUpdate.id;
    })
    this.isLoadingSubscription = this.todoService.isLoading.subscribe(isloading=>{
      this.isLoading = isloading;
      console.log(`loading : ${isloading}`);
      
    })
    
  }

  onSelect(i:number){
   // console.log(this.todos[i]);
    this.todoService.onSeletedItem(this.todos[i]);
    this.itemIndex = i;
  }

  onDelete(i:number){
    this.todoService.deleteTodo(i);
  }

  ngOnDestroy(){
    this.todosSubscription?.unsubscribe();
    this.itemIndexSubscription.unsubscribe();
  }

}
