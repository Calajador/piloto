import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductSelectionComponent } from './components/product-selection/product-selection.component';
import { RegularCustomerComponent } from './components/regular-customer/regular-customer.component';
import { DniSearchComponent } from './components/dni-search/dni-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonalManagementComponent } from './components/personal-management/personal-management.component';
import { AuthGuard } from './guards/auth.guard';
import { IntervenerAllocationComponent } from './components/intervener-allocation/intervener-allocation.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ProductSelectionComponent,
    RegularCustomerComponent,
    PersonalManagementComponent,
    DniSearchComponent,
    IntervenerAllocationComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    DatePipe,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }