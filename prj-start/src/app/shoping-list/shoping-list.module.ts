import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { ShopingListRouterModule } from "./shoping-list-router.module";
import { ShopingListComponent } from "./shoping-list.component";

@NgModule({
    declarations:[
        ShopingListComponent,
        ShopingEditComponent,
    ],
    imports:[SharedModule,RouterModule,FormsModule,ShopingListRouterModule,],
    exports:[

    ]
})
export class ShopingListModule{}