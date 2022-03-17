import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipies/recipe.model";
import { RecipeService } from "../recipies/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService {

 constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

 saveRecipes(){
     const recipes = this.recipeService.getRecipes();
     this.http.put("https://angulardemo-3a75a-default-rtdb.firebaseio.com/recipes.json",recipes).subscribe((responseData)=>{
         
      console.log(responseData);
         
     })
 }

 fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        console.log(user.token);
        
        return this.http.get<Recipe[]>(
          'https://angulardemo-3a75a-default-rtdb.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

}