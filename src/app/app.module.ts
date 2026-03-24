import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartWidgetComponent } from './compnents/cart-widget/cart-widget.component';
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
import { VisionDataComponent } from './compnents/vision-data/vision-data.component';
import { TermsComponent } from './compnents/terms/terms.component';
import { DailySpecialsComponent } from './compnents/daily-specials/daily-specials.component';
import { ExtrasPageComponent } from './compnents/extras-page/extras-page.component';
import { DrinksPageComponent } from './compnents/drinks-page/drinks-page.component';
import { CustomizationPageComponent } from './compnents/customization-page/customization-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CartWidgetComponent,
    LANDINGPAGEComponent,
    LoginComponent,
    RegisterComponent,
    MenuAndCustomizationComponent,
    OrderManagementComponent,
    GwinyaCombosComponent,
    ZuluBurgersComponent,
    KotaMenuComponent,
    WingsComponent,
    RollsComponent,
    DailySpecialsComponent,
    ExtrasPageComponent,
    DrinksPageComponent,
    CustomizationPageComponent,
    DailySpecialsComponent,
    CrmDashboardComponent,
    AboutComponent,
    VisionLegalComponent,
    VisionDataComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
