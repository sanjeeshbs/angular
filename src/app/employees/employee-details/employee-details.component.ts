import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/models/employees';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UnAuthorized } from 'src/app/common/un-authorized';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      name: [],
      salary: []
    });

    combineLatest(this.route.paramMap, this.route.queryParamMap)
      .subscribe(combinedParams => {
        const id = combinedParams[0].get('id'); // required parameter
        const salary = combinedParams[1].get('salary'); // optional parameter

        if (id != null){
          this.employeeService.getResource<Employee>(id)
          .subscribe((emp) => {this.form.setValue(emp); },
          error => {
            if (error instanceof UnAuthorized){
              alert('You are not authorized to view this page');
            }else {
              throwError(error);
            }
        }
          );
        }

      });

    // let id=this.route.snapshot.paramMap.get('id'); // alternate way

    // this.route.paramMap.subscribe(params=>{
    //   let id= params.get('id');
    //   if(id!=null){
    //     this.employeeService.getResource<Employee>(id)
    //     .subscribe((emp)=> this.form.setValue(emp));
    //   }


    // this.route.snapshot.queryParamMap.get('salary') // alternative way to get query parameters
    // this.route.queryParamMap
    //   .subscribe(params=>{
    //     params.get('salary')
    //   })
    // });
  } // ngOninit ends


  onSave(employee: Employee){
    this.employeeService.update<Employee>(employee.id.toString(), employee)
    .subscribe(emp => {
      this.router.navigate(['/employees'], {queryParams: {fromPage: emp.name, updateStatus: 'success' }});
    });
  }

}
