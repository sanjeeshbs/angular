import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeService } from './employees/employee.service';
import { AppErrorhanler } from './common/app-error-handler';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    NoAccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService,
    AuthService,
    {provide: AppErrorhanler, useClass: ErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
