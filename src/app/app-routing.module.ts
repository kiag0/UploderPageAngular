import { UploaderComponent } from './uploader/uploader.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './image/image.component';

const routes: Routes = [

  {path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'uploader', component: ImageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
  {path: 'department', component: CreateDepartmentComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'add', component: UploaderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
