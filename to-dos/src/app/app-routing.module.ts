import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  {path:"", component:TodoFormComponent},
  {path:"auth", component:AuthenticationComponent},
  {path:":id/edit", component:TodoFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
