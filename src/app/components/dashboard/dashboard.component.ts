import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeListComponent } from '../employees/employees.component'; // if using employee table here

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, EmployeeListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pieChartLabels = ['HR', 'Engineering', 'Finance', 'Sales'];
  pieChartData = [25, 25, 25, 25];
  pieChartType = 'pie';
}
