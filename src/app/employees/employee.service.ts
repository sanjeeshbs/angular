import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {
  constructor(http: HttpClient) {
    super('https://88.201.64.7:4058/api/Employees', http);
  }

}
