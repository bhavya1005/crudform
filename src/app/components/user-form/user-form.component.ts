import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
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
