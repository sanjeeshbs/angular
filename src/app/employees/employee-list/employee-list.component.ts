import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employees } from 'src/app/models/employees';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { UnAuthorized } from 'src/app/common/un-authorized';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  currentUser: string;
  loggedIn: boolean;
  employees: Employees;
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.currentUser.username;
    this.employeeService.getAll<Employees>()
      .subscribe(
        employees => {
          this.employees = employees;
        },
        error => {
            if (error instanceof UnAuthorized){
              alert('You are not authorized to view this page');
            }else {
              throwError(error);
            }
        }
      );

  }

 

}
