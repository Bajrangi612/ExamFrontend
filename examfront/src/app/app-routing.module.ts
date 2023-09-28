import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserdashboardComponent } from './pages/user/userdashboard/userdashboard.component';
import { AdminGaurdGuard } from './services/admin-gaurd.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
  path :"signup",
  component:SignupComponent,
  pathMatch: "full"
  },{
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },{
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate: [AdminGaurdGuard]
  },{
    path:'user',
    component:UserdashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
