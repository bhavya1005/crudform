import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  userList: any[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      department: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      address: ['', Validators.required],
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
