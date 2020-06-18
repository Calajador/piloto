import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSelectionComponent } from './components/product-selection/product-selection.component';
import { RegularCustomerComponent } from './components/regular-customer/regular-customer.component';
import { DniSearchComponent } from './components/dni-search/dni-search.component';
import { PersonalManagementComponent } from './components/personal-management/personal-management.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { IntervenerAllocationComponent } from './components/intervener-allocation/intervener-allocation.component';
import { AdditionalDataPersonComponent } from './components/additional-data-person/additional-data-person.component';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { SelectionCoverageComponent } from './components/selection-coverage/selection-coverage.component';
import { PolicyCalculationComponent } from './components/policy-calculation/policy-calculation.component';
import { AccountAdditionalComponent } from './components/account-additional/account-additional.component';
import { SuccessProcessComponent } from './components/success-process/success-process.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';


const routes: Routes = [
  {path:'',redirectTo:'producto',pathMatch:'full'},
  { path: 'altapersona/:type', component: PersonalManagementComponent },
  { path: 'altavehiculo', component: VehicleManagementComponent },
  { 
    path: 'producto', 
    component: ProductSelectionComponent,
    canActivate:[AuthGuard] 
  },
  { path: 'dni/:type', component: DniSearchComponent },
  { path: 'adicional', component: AdditionalDataPersonComponent },
  { path: 'finproceso', component: SuccessProcessComponent },
  { path: 'coberturas', component: SelectionCoverageComponent }, 
  { path: 'resumen/:type', component: SummaryComponent },  
  { path: 'cuenta', component: AccountAdditionalComponent }, 
  { path: 'fincontratacion', component: PolicyCalculationComponent }, 
  { path: 'tarjeta', component: CreditCardComponent }, 
  { path: 'asignacion/:type', component: IntervenerAllocationComponent },
  { path: 'regular/:type', component: RegularCustomerComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
