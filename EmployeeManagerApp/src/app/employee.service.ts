import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiServerURL = environment.apiBaseURL;

    constructor(private http: HttpClient) { }
    
    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerURL}/employee/all`);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerURL}/employee/add`, employee);
    }
    
    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerURL}/employee/update`, employee);
    }

    public deleteEmployee(employeeID: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerURL}/employee/delete/${employeeID}`);
    }
}