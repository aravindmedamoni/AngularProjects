import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentNotFoundComponent } from "./component-not-found/component-not-found.component";
// import { AuthComponent } from "./auth/auth.component";
// import { AuthGuardService } from "./auth/auth.guard.service";
// import { ComponentNotFoundComponent } from "./component-not-found/component-not-found.component";
// import { RecipeEditComponent } from "./recipies/recipe-edit/recipe-edit.component";
// import { RecipeStartComponent } from "./recipies/recipe-start/recipe-start.component";
// import { RecipesResolveService } from "./recipies/recipes-resolve.service";
// import { RecipieDetailComponent } from "./recipies/recipie-detail/recipie-detail.component";
// import { RecipiesComponent } from "./recipies/recipies.component";
// import { ShopingListComponent } from "./shoping-list/shoping-list.component";


const appRoutes: Routes = [
    // {path:"recipies", component:RecipiesComponent, canActivate:[AuthGuardService], resolve:[RecipesResolveService],
    // children:[
    //     {path:"", component:RecipeStartComponent},
    //     {path:"new", component:RecipeEditComponent},
    //     {path:":id",component:RecipieDetailComponent, resolve:[RecipesResolveService]},
    //     {path:":id/edit", component:RecipeEditComponent,resolve:[RecipesResolveService]},
        
    // ]},
    {path:"", redirectTo:"/recipies", pathMatch:"full"},
    {path:"recipies", loadChildren:'./recipies/recipes.module#RecipesModule'},
    {path:"shoping-list", loadChildren:'./shoping-list/shoping-list.module#ShopingListModule'},
    {path:"auth", loadChildren:'./auth/auth.module#AuthModule'},
    {path:"**", component:ComponentNotFoundComponent}
    // {path:"shoping-list", component:ShopingListComponent},
    // {path:'auth', component:AuthComponent},
    
  ]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes),
    ],
    exports:[RouterModule]
})
export class AppRouterModule{

}