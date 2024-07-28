import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../modules/employees';
import { Observable } from 'rxjs';

const API_URL = "https://api.test.ulaznice.hr/paganini/api/job-interview/employees";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(API_URL);
  }
}
