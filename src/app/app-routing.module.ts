import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LANDINGPAGEComponent } from './compnents/landingpage/landingpage.component';
import { LoginComponent } from './compnents/login/login.component';
import { RegisterComponent } from './compnents/register/register.component';
import { MenuAndCustomizationComponent } from './compnents/menu-and-customization/menu-and-customization.component';
import { OrderManagementComponent } from './compnents/order-management/order-management.component';

const routes: Routes = [
  { path: '', component: LANDINGPAGEComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuAndCustomizationComponent },
  { path: 'orders', component: OrderManagementComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
