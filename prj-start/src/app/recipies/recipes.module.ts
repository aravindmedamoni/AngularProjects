import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DropdownDirective } from "../shared/dropdown.directive";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipieDetailComponent } from "./recipie-detail/recipie-detail.component";
import { RecipieItemComponent } from "./recipies-list/recipie-item/recipie-item.component";
import { RecipiesListComponent } from "./recipies-list/recipies-list.component";
import { RecipiesComponent } from "./recipies.component";
import { RecipesRouterModule } from "./recpies-router.module";

@NgModule({
    declarations:[
        RecipiesComponent,
        RecipiesListComponent,
        RecipieDetailComponent,
        RecipieItemComponent,
        RecipeEditComponent,
        RecipeStartComponent,
        
    ],
    imports:[
        RouterModule, SharedModule, ReactiveFormsModule, RecipesRouterModule
    ],
    // exports:[
    //     RecipiesComponent,
    //     RecipiesListComponent,
    //     RecipieDetailComponent,
    //     RecipieItemComponent,
    //     RecipeEditComponent, 
    //     RecipeStartComponent,
    //     DropdownDirective,
    // ]
})
export class RecipesModule{

}