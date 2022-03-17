import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard.service";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolveService } from "./recipes-resolve.service";
import { RecipieDetailComponent } from "./recipie-detail/recipie-detail.component";
import { RecipiesComponent } from "./recipies.component";

const recipesRoutes:Routes = [
    {path:"", component:RecipiesComponent, canActivate:[AuthGuardService], resolve:[RecipesResolveService],
    children:[
        {path:"", component:RecipeStartComponent},
        {path:"new", component:RecipeEditComponent},
        {path:":id",component:RecipieDetailComponent, resolve:[RecipesResolveService]},
        {path:":id/edit", component:RecipeEditComponent,resolve:[RecipesResolveService]},
        
    ]},
]
@NgModule({
    imports:[
        RouterModule.forChild(recipesRoutes)
    ],
    exports:[RouterModule]
})
export class RecipesRouterModule{}