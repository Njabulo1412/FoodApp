import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LANDINGPAGEComponent } from './compnents/landingpage/landingpage.component';
import { LoginComponent } from './compnents/login/login.component';
import { RegisterComponent } from './compnents/register/register.component';
import { MenuAndCustomizationComponent } from './compnents/menu-and-customization/menu-and-customization.component';
import { OrderManagementComponent } from './compnents/order-management/order-management.component';
import { GwinyaCombosComponent } from './compnents/gwinya-combos/gwinya-combos.component';
import { ZuluBurgersComponent } from './compnents/zulu-burgers/zulu-burgers.component';
import { KotaMenuComponent } from './compnents/kota-menu/kota-menu.component';
import { WingsComponent } from './compnents/wings/wings.component';
import { RollsComponent } from './compnents/rolls/rolls.component';
import { CrmDashboardComponent } from './compnents/crm-dashboard/crm-dashboard.component';
import { AboutComponent } from './compnents/about/about.component';
import { VisionLegalComponent } from './compnents/vision-legal/vision-legal.component';
import { TermsComponent } from './compnents/terms/terms.component';
import { DailySpecialsComponent } from './compnents/daily-specials/daily-specials.component';

const routes: Routes = [
  { path: '', component: LANDINGPAGEComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuAndCustomizationComponent },
  { path: 'orders', component: OrderManagementComponent },
  { path: 'gwinya-combos', component: GwinyaCombosComponent },
  { path: 'zulu-burgers', component: ZuluBurgersComponent },
  { path: 'kota-menu', component: KotaMenuComponent },
  { path: 'wings', component: WingsComponent },
  { path: 'rolls', component: RollsComponent },
  { path: 'daily-specials', component: DailySpecialsComponent },
  { path: 'crm', component: CrmDashboardComponent },
  { path: 'vision', component: VisionLegalComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
