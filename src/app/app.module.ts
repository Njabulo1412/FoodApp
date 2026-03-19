import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LANDINGPAGEComponent } from './compnents/landingpage/landingpage.component';
import { LoginComponent } from './compnents/login/login.component';
import { RegisterComponent } from './compnents/register/register.component';
import { MenuAndCustomizationComponent } from './compnents/menu-and-customization/menu-and-customization.component';
import { OrderManagementComponent } from './compnents/order-management/order-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LANDINGPAGEComponent,
    LoginComponent,
    RegisterComponent,
    MenuAndCustomizationComponent,
    OrderManagementComponent
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
