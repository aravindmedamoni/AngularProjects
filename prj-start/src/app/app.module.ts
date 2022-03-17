import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { ShopingEditComponent } from './shoping-list/shoping-edit/shoping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShopingListService } from './shoping-list/shopinglist.service';
import { AppRouterModule } from './app-router.module';
import { RecipeService } from './recipies/recipe.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { LoadingRipleComponent } from './shared/loading-indicator/loading-riple.component';
import { AuthInterceptorService } from './auth/auth-interceptors.service';
import { AlertDialogueComponent } from './shared/alert-dialogue/alert-dialogue.component';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { RecipesModule } from './recipies/recipes.module';
import { ShopingListModule } from './shoping-list/shoping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
//import { shopingListReducer } from './shoping-list/store/shopingp-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [ShopingListService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
