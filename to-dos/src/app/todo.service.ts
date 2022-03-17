
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStoreService } from './centraldata/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  isUpdate:Subject<{isUpdating:boolean,id:any}> = new Subject<{isUpdating:boolean,id:any}>();
  latestTodos:Subject<Todo[]>= new Subject<Todo[]>();
  seletedItem:Subject<Todo> = new Subject<Todo>();
  isLoading:Subject<boolean> = new Subject<boolean>();
  todos:Todo[]=[];//[{title:'milk',text:'buy milk',status:'pending'},{title:'eggs',text:'buy eggs',status:'pending'},{title:'workout',text:'Do exercise',status:'completed'}];


  constructor(private dataStoreService:DataStoreService) { }

  


  getTodos(){
     this.isLoading.next(false);
    // this.dataStoreService.fetchData().subscribe(respData=>{
    //   this.isLoading.next(false);
    //   this.todos = respData as Todo[];
    //   this.latestTodos.next(this.todos.slice());
    // })
    this.dataStoreService.fetchAllTodos().subscribe((responseData:ResponseData)=>{
      if(responseData.success){
        this.todos = responseData.data as Todo[];
        this.latestTodos.next(this.todos.slice());
      }else{
        console.log(responseData.message);
        
      }
      this.isLoading.next(false);
      
    })

    return this.todos.slice();
    
  }

  getTodo(index:number){
    return this.todos.slice()[index];
  }

  addTodo(newTodo:Todo){
    this.isLoading.next(true);
    // this.todos.push(newTodo);
    // this.latestTodos.next(this.todos.slice());
    // this.isLoading.next(false);
    this.dataStoreService.saveTodo(newTodo).subscribe((responseData:ResponseData)=>{
      console.log(responseData.data as Todo);
      this.todos.push(responseData.data as Todo);      
      this.latestTodos.next(this.todos.slice());
      this.isLoading.next(false);
  });
  }

  updateTodo(i:number,updateTodo:Todo){
    this.todos[i] = {_id:this.todos[i]._id!,title:updateTodo.title, text:updateTodo.text, status:updateTodo.status};
    this.isUpdate.next({isUpdating:false,id:null});
   // this.dataStoreService.saveData(this.todos);
   let id = this.todos[i]._id!;
   this.dataStoreService.updateTodo(id,updateTodo).subscribe((responseData:ResponseData)=>{
     if(responseData.success){
       console.log(responseData.message);
     }else{
      console.log(responseData.message);
     }
     this.latestTodos.next(this.todos.slice());
   })
    
  }

  onSeletedItem(todo:Todo){
    console.log("Id is: "+this.todos.indexOf(todo));
    
    this.isUpdate.next({isUpdating:true,id:this.todos.indexOf(todo)});
    this.seletedItem.next(todo);
  }

  deleteTodo(i:number){
    console.log("deleted id:"+i);
    console.log(this.todos[i]);
    
    let id = this.todos[i]._id!;
    console.log(`ID is: ${id}`);
    
    
    this.todos.splice(i,1);
   // this.dataStoreService.saveData(this.todos);
   this.dataStoreService.deleteTodo(id).subscribe((responseData:ResponseData)=>{
     console.log(responseData.message);
     this.latestTodos.next(this.todos.slice());
   });
    
    
  }
}

export interface Todo{
  _id?:string,
  title:string,
  text:string,
  status:string
}

export interface ResponseData{
  message:string,
  success:boolean,
  data:Todo | Todo[]
} 
