import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseData, Todo } from "../todo.service";

@Injectable({providedIn:'root'})
export class DataStoreService{
    
    constructor(private http:HttpClient){}

    // saveData(todos:Todo[]){
    //     this.http.put("https://angulardemo-3a75a-default-rtdb.firebaseio.com/todos.json", todos).subscribe(respData=>{
    //         console.log(respData);
            
    //     })
        
    // }

    // fetchData(){
    //    return this.http.get("https://angulardemo-3a75a-default-rtdb.firebaseio.com/todos.json");
    // }
    saveTodo(todo:Todo){
       return this.http.post<ResponseData>("http://localhost:3000/api/todos/save",todo);
    };

    fetchAllTodos(){
        return this.http.get<ResponseData>("http://localhost:3000/api/todos/all");
    }

    deleteTodo(id:string){
        return this.http.delete<ResponseData>("http://localhost:3000/api/todos/delete/"+id);
    }

    updateTodo(id:string, updatedTodo:Todo){
        return this.http.put<ResponseData>("http://localhost:3000/api/todos/update/"+id, updatedTodo);
    }
}