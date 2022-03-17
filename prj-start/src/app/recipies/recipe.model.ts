import { Ingrediant } from "../shared/ingrediant.model";

export class Recipe{
   public name:string;
   public description:string;
   public imagePath:string;
   public ingredients:Ingrediant[]

   constructor(name:string,description:string,imagePath:string, ingredients:Ingrediant[]){
       this.name = name;
       this.description = description;
       this.imagePath = imagePath;
       this.ingredients = ingredients;
   }
}