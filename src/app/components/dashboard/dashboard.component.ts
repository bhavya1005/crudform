import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartConfiguration } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // All data
  employees: User[] = [];
  filteredEmployees: User[] = [];

  // UI state
  searchTerm = '';
  filterDept = '';
  pageSize = 25;
  currentPage = 1;
  totalPages = 1;

  // Summary
  totalEmployees = 0;
  overallAvgSalary = 0;
  departmentCount = 0;

  // Dept analytics
  departmentStats: Record<string, number> = {};
  avgSalaryByDept: Record<string, number> = {};

  // Charts
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = { labels: [], datasets: [{ data: [] }] };

  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration['data'] = { labels: [], datasets: [{ data: [], label: 'Avg Salary' }] };

  // Top earners
  topEarners: User[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: User[]) => {
      this.employees = data;
      this.prepareDashboardStats();
      this.applyFilter();
    });
  }

  private prepareDashboardStats(): void {
    // Totals
    this.totalEmployees = this.employees.length;
    this.overallAvgSalary =
      this.employees.reduce((sum, u) => sum + u.salary, 0) /
      (this.totalEmployees || 1);

    // Departments
    const depts = Array.from(new Set(this.employees.map(u => u.department)));
    this.departmentCount = depts.length;

    depts.forEach(dept => {
      const group = this.employees.filter(u => u.department === dept);
      this.departmentStats[dept] = group.length;
      this.avgSalaryByDept[dept] =
        group.reduce((sum, u) => sum + u.salary, 0) /
        (group.length || 1);
    });

    // Pie chart
    const labels = Object.keys(this.departmentStats);
    const counts = labels.map(d => this.departmentStats[d]);
    this.pieChartData = { labels, datasets: [{ data: counts }] };

    // Bar chart
    const avgs = labels.map(d => this.avgSalaryByDept[d]);
    this.barChartData = { labels, datasets: [{ data: avgs, label: 'Avg Salary' }] };

    // Top earners
    this.topEarners = [...this.employees]
      .sort((a, b) => b.salary - a.salary)
      .slice(0, 5);
  }

  applyFilter(): void {
    this.filteredEmployees = this.employees.filter(u => {
      const matchesText =
        u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.id.includes(this.searchTerm);
      const matchesDept = this.filterDept ? u.department === this.filterDept : true;
      return matchesText && matchesDept;
    });
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
    this.applyFilter();
  }

  onDeptChange(value: string): void {
    this.filterDept = value;
    this.applyFilter();
  }

  exportCsv(): void {
    const header = ['Name','ID','Department','Salary','Phone','Pincode','Address'];
    const rows = this.filteredEmployees.map(u => [
      u.name, u.id, u.department, u.salary, u.phone, u.pincode, `"${u.address}"`
    ]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'employees.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  get pagedEmployees(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }
}
