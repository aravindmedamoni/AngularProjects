import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})
export class RecipieDetailComponent implements OnInit {

  recipe:Recipe;
  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }

  id:number;
  ngOnInit(): void {

     this.route.params.subscribe((params)=>{
       this.id=+params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      
    })

  }

  addIngredientstoShopList(){
    this.recipeService.addIngredientsToShopingList(this.recipe.ingredients);
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id) 
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
