import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSelectionComponent } from './components/product-selection/product-selection.component';
import { RegularCustomerComponent } from './components/regular-customer/regular-customer.component';
import { DniSearchComponent } from './components/dni-search/dni-search.component';
import { PersonalManagementComponent } from './components/personal-management/personal-management.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { IntervenerAllocationComponent } from './components/intervener-allocation/intervener-allocation.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'altapersona', component: PersonalManagementComponent },
  { 
    path: 'producto', 
    component: ProductSelectionComponent,
    canActivate:[AuthGuard] 
  },
  { path: 'dni', component: DniSearchComponent },
  { path: 'asignacion', component: IntervenerAllocationComponent },
  { path: 'regular', component: RegularCustomerComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
