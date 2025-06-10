import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: User[] = [];

  constructor() {
    this.generateDummyEmployees(50);
  }

  getEmployees(): User[] {
    return this.employees;
  }

  getEmployeeStats(): { [department: string]: number } {
    const stats: { [department: string]: number } = {};
    for (const emp of this.employees) {
      stats[emp.department] = (stats[emp.department] || 0) + 1;
    }
    return stats;
  }

  private generateDummyEmployees(count: number): void {
    const departments = ['HR', 'Engineering', 'Finance', 'Sales'];
    for (let i = 0; i < count; i++) {
      const emp: User = {
        id: i + 1,
        name: `Employee ${i + 1}`,
        department: departments[i % departments.length],
        phone: String(9000000000 + Math.floor(Math.random() * 100000000)),
        address: `Street ${i + 1}`,
        pincode: String(100000 + i)
      };
      this.employees.push(emp);
    }
  }
}
