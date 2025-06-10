import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true, // 👈 This is critical for standalone setup
  imports: [CommonModule, ReactiveFormsModule], // 👈 Add this line
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeeListComponent {
  userForm: FormGroup;
  userList: any[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pincode: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.editIndex !== null) {
        this.userList[this.editIndex] = this.userForm.value;
        this.editIndex = null;
      } else {
        this.userList.push(this.userForm.value);
      }
      this.userForm.reset();
    }
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.userForm.setValue(this.userList[index]);
  }

  onDelete(index: number) {
    this.userList.splice(index, 1);
    if (this.editIndex === index) {
      this.userForm.reset();
      this.editIndex = null;
    }
  }
}
