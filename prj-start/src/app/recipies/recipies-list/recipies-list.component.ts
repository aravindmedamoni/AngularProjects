import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipies-list',
  templateUrl: './recipies-list.component.html',
  styleUrls: ['./recipies-list.component.css']
})
export class RecipiesListComponent implements OnInit, OnDestroy {

  recipes:Recipe[] = []
  recipesSubscription : Subscription;

  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.changedRecipes.subscribe((latestRecipes:Recipe[])=>{
      this.recipes = latestRecipes;
    })
  }

  // onSelectedRecipe(recipe:Recipe){
  //   this.selectedRecipeItem.emit(recipe);
  // }

  navToEditPage(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
