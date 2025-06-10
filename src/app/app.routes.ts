import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentsComponent } from './components/departments/departments';
import { SettingsComponent } from './components/settings/settings';
import { EmployeeListComponent } from './components/employees/employees.component';

export const routes: Routes = [
  { path: 'add-employee', component: UserFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
