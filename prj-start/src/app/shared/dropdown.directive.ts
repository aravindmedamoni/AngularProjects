import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:"[appDropdown]"
})
export class DropdownDirective{

    
    @HostBinding("class.open") isOPen = false;;
    @HostListener("click") toggleOpen(){
        this.isOPen = !this.isOPen;
        
    }
}