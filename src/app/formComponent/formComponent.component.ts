import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formComponent',
  templateUrl: './formComponent.component.html',
  styleUrls: ['./formComponent.component.css']
})
export class FormComponentComponent implements OnInit {
  @ViewChild("printEmployeeInfo") employeeInfo!: ElementRef;
  @ViewChild("form") form!: ElementRef;

  employee: any = {};
  employeeId: number = 0;
  employeeName: string = '';
  employeeSurname: string = '';
  employeeBirth: string = '';
  employeeJob: string = '';
  private employeeNumber: number = 20;

  constructor() { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  private generateEmployeeId() {
    return ++this.employeeNumber;
  }

  onSubmit(form: any) {
    this.employee = {
      id: this.generateEmployeeId(),
      name: this.employeeName,
      surname: this.employeeSurname,
      birth: this.employeeBirth,
      jobTitle: this.employeeJob
    }

    this.employeeInfo.nativeElement.innerHTML = `
      <b>Id:</b> ${this.employee.id}<br>
      <b>Ime:</b> ${this.employee.name}<br>
      <b>Prezime:</b> ${this.employee.surname}<br>
      <b>Datum rođenja:</b> ${this.employee.birth}<br>
      <b>Pozicija:</b> ${this.employee.jobTitle}<br>
    `;

    console.log("Id:", this.employee.id);
    console.log("Ime:", this.employee.name);
    console.log("Prezime:", this.employee.surname);
    console.log("Datum rođenja:", this.employee.birth);
    console.log("Pozicija:", this.employee.jobTitle);
  }

}
