import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGaurd } from './services/auth-gaurd.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGaurd] },
  { path: 'employee-details/:id/:name', component: EmployeeDetailsComponent, canActivate: [AuthGaurd, AdminAuthGuard] },
  { path: 'employee-details', component: EmployeeDetailsComponent, canActivate: [AuthGaurd, AdminAuthGuard] },
  { path: 'no-access', component: NoAccessComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
