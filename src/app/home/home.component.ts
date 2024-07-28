import { Component, OnInit } from '@angular/core';
import { Employee } from '../modules/employees';
import { ServicesService } from '../services/services.service';
import { clear } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  employees!: Employee[];

  constructor(private employeeService: ServicesService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.data;
    });

    this.employees.forEach((employee) => {
      // const date = new Date(employee.dateOfBirth);
      employee.dateOfBirth = this.datePipe.transform(employee.dateOfBirth, 'dd.MM.yyyy - HH:mm:ss')!;

    })

    // console.log(this.employees);
  }

}
