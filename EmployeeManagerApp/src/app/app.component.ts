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
        addForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset;
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }

  public onDeleteEmployee(employeeID: number | undefined): void {
    this.employeeService.deleteEmployee(employeeID!).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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
      if (employee){
        this.editEmployee = employee;
      }
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if (mode === 'delete') {
      if (employee){
        this.deleteEmployee = employee;
      }
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
