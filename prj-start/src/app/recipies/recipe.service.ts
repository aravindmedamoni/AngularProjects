
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediant.model";
import { ShopingListService } from "../shoping-list/shopinglist.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{

    // recipes:Recipe[] = [
    //     new Recipe("french","famous frech fish food","https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/CHETTINAD_FISH_FRY_with_ROASTED_CORN_ONION_AND_CARROTS_WITH_FRENCH_BEANS.jpg",[ new Ingrediant("masala",1), new Ingrediant("coconot",2)])
    //     ,new Recipe("chineese","famous chineese fish fry","https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/CHETTINAD_FISH_FRY_with_ROASTED_CORN_ONION_AND_CARROTS_WITH_FRENCH_BEANS.jpg",[ new Ingrediant("masala",1), new Ingrediant("coconot",2)])
    //     ,new Recipe("japaneese","famous japaneese fish curry","https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/CHETTINAD_FISH_FRY_with_ROASTED_CORN_ONION_AND_CARROTS_WITH_FRENCH_BEANS.jpg",[ new Ingrediant("masala",1), new Ingrediant("coconot",2)])
     
    //   ]
      recipes :Recipe[]= [];  

      changedRecipes = new Subject<Recipe[]>()

      constructor(private shopingListService:ShopingListService){};

      getRecipes(){
          return this.recipes.slice();
      }

      setRecipes(recipes:Recipe[]){
          this.recipes = recipes;
          this.changedRecipes.next(this.recipes.slice());
      }

      getRecipe(id:number){
          return this.recipes.slice()[id];
      }

      addIngredientsToShopingList(ingredients:Ingrediant[]){
          this.shopingListService.addIngredients(ingredients);
      }

      addRecipe(newRecipe:Recipe){
          this.recipes.push(newRecipe)
           this.changedRecipes.next(this.recipes.slice());
      }
      updateRecipe(id:number, updatedRecipe:Recipe){
          this.recipes[id] = updatedRecipe;
          this.changedRecipes.next(this.recipes.slice());
      }

      deleteRecipe(id:number){
          this.recipes.splice(id,1);
          this.changedRecipes.next(this.recipes.slice())
      }


}