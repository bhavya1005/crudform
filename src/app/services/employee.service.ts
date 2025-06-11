import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { faker } from '@faker-js/faker';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: User[];

  constructor() {
    this.employees = this.generateFakeEmployees(500);
  }

  private generateFakeEmployees(count: number): User[] {
    const depts = ['Engineering','HR','Marketing','Sales','Finance'];
    return Array.from({ length: count }).map((_, i) => ({
      name: faker.person.fullName(),
      id: `EMP${String(i+1).padStart(4,'0')}`,
      salary: faker.number.float({ min: 30000, max: 120000, fractionDigits: 2 }),
      department: faker.helpers.arrayElement(depts),
      phone: faker.string.numeric(10),
      pincode: faker.location.zipCode(),
      address: faker.location.streetAddress().replace(/\n/g, ', ')
    }));
  }

  /** Returns an Observable of the full list */
  getEmployees(): Observable<User[]> {
    return of(this.employees);
  }
}
