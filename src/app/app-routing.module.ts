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
  { path: 'dni/:type', component: DniSearchComponent, canActivate:[AuthGuard]  },
  { path: 'adicional', component: AdditionalDataPersonComponent , canActivate:[AuthGuard] },
  { path: 'finproceso/:success', component: SuccessProcessComponent, canActivate:[AuthGuard]  },
  { path: 'coberturas', component: SelectionCoverageComponent, canActivate:[AuthGuard]  }, 
  { path: 'resumen/:type', component: SummaryComponent, canActivate:[AuthGuard]  },  
  { path: 'cuenta', component: AccountAdditionalComponent, canActivate:[AuthGuard]  }, 
  { path: 'fincontratacion', component: PolicyCalculationComponent, canActivate:[AuthGuard]  }, 
  { path: 'tarjeta/:id', component: CreditCardComponent, canActivate:[AuthGuard]  }, 
  { path: 'asignacion/:type', component: IntervenerAllocationComponent, canActivate:[AuthGuard]  },
  { path: 'regular/:type', component: RegularCustomerComponent, canActivate:[AuthGuard]  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
