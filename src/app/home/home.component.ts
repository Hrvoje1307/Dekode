import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  jobTitles: Array<any> = [];
  filteredEmployees: Array<any> = [];
  jobTitlesUnique: Array<any> = [];
  allowedJobTitles: Array<any> = [];
  pageNum: number = 1;
  emoloyeeShowNum: number = 10;

  @ViewChildren("jobTitle__btn") jobTitle__btn!: QueryList<ElementRef>;
  @ViewChild("searchInput") searchInput!: ElementRef;
  constructor(private employeeService: ServicesService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.data;
    });

    this.employees.forEach((employee) => {
      employee.dateOfBirth = this.datePipe.transform(employee.dateOfBirth, 'dd.MM.yyyy - HH:mm:ss')!;
    })

    this.employees.map(employe => {
      this.jobTitles.push(employe.jobTitle);
    });

    this.jobTitlesUnique = Array.from(new Set(this.jobTitles));
  }

  ngAfterViewInit(): void {
    console.log(this.showEmployees());
  }

  showEmployees() {
    const value = (this.searchInput?.nativeElement.value).toLowerCase() || '';
    this.filteredEmployees = this.employees.filter(employee => {
      return employee.firstName.toLowerCase().includes(value) || employee.lastName.toLowerCase().includes(value);
    });
  }

  onInputChange() {
    this.showEmployees();
  }

  jobTitleInArray(jobTitle: string) {
    if (this.allowedJobTitles.includes(jobTitle) || !this.allowedJobTitles.length) {
      return true;
    } else {
      return false;
    }
  }

  toggleArray(jobTitle: string) {
    if (!this.allowedJobTitles.includes(jobTitle)) {
      this.allowedJobTitles.push(jobTitle);
    } else {
      const index = this.allowedJobTitles.indexOf(jobTitle);
      this.allowedJobTitles.splice(index, 1);
    }
  }

  sortNames() {
    this.filteredEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  sortSurnames() {
    this.filteredEmployees.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  sortJobTitle() {
    this.filteredEmployees.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
  }

  sortNormal() {
    this.filteredEmployees.sort((a, b) => a.id - b.id);
  }

  showPagesEmployees(employeeId: number) {
    const min = (this.pageNum * this.emoloyeeShowNum) - this.emoloyeeShowNum;
    const max = (this.pageNum * this.emoloyeeShowNum);
    if (employeeId > min && employeeId <= max) return true;
    else return false;
  }

  checkedPage() {
    return (this.pageNum !== 1 && this.pageNum !== Math.ceil(this.filteredEmployees.length / this.emoloyeeShowNum))
  }

  checkedLastPage() {
    return (this.pageNum === Math.ceil(this.filteredEmployees.length / this.emoloyeeShowNum))
  }

  totalEmployees() {
    return this.emoloyeeShowNum < this.filteredEmployees.length;
  }

  increasePage() {
    this.pageNum++;
  }

  decreasePage() {
    this.pageNum--;
  }
}


