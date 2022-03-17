import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopingListComponent } from "./shoping-list.component";

const shopingListRoutes:Routes=[
    {path:"", component:ShopingListComponent},
]
@NgModule({
    imports:[
        RouterModule.forChild(shopingListRoutes)
    ],
    exports:[RouterModule]
})
export class ShopingListRouterModule{}