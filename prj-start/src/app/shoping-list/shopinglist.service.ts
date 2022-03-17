
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediant.model";

export class ShopingListService{
    ingredientsChanged = new Subject<Ingrediant[]>();
    startedEditing = new Subject<number>();

    ingredients : Ingrediant[]= [
        new Ingrediant("ground nut",300),
        new Ingrediant("potato",60),
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(id:number){
          return this.ingredients[id];
      }

      deleteIngredient(id:number){
        this.ingredients.splice(id,1)
          return this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredient(ingredient:Ingrediant){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
          
      }

      addIngredients(ingredients:Ingrediant[]){
          this.ingredients.push(...ingredients);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredients(id:number, ingredient:Ingrediant){
          this.ingredients[id]= ingredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}