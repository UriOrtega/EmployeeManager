import { HttpErrorResponse } from '@angular/common/http';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;
  title: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
      this.getEmployees();
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }

  public onUpdateEmployee(editForm: NgForm): void {
    //TO DO
  }

  public onDeleteEmployee(employeeID: number | undefined): void {
    //TO DO
  }
  
  public onOpenModal(mode: string, employee?: Employee|null): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
