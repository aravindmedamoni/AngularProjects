import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertDialogueComponent } from "./alert-dialogue/alert-dialogue.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingRipleComponent } from "./loading-indicator/loading-riple.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    declarations:[
        LoadingRipleComponent,
        AlertDialogueComponent,
        PlaceholderDirective,
        DropdownDirective,
    ],
    imports:[CommonModule],
    exports:[
        LoadingRipleComponent,
        AlertDialogueComponent,
        PlaceholderDirective,
        DropdownDirective, 
        CommonModule
    ]
})
export class SharedModule{}