import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const stats = this.employeeService.getEmployeeStats();
    this.pieChartLabels = Object.keys(stats);
    this.pieChartData = Object.values(stats);
  }
}
