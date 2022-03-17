import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipesResolveService implements Resolve<Recipe[]>{
    constructor(private datastrgService : DataStorageService, private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        console.log("1 resolve called..");
        
        if(recipes.length===0){
            console.log("2 resolve called..");
            return this.datastrgService.fetchRecipes();
        }else{
            return recipes;
        }
    }

}