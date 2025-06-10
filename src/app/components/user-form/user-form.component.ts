// src/app/components/user-form/user-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const newUser = {
      id: Date.now(),
      ...this.userForm.value
    };

    this.users.push(newUser);
    this.userForm.reset();
  }

  onEdit(index: number): void {
    const user = this.users[index];
    this.userForm.patchValue(user);
    this.onDelete(index);
  }

  onDelete(index: number): void {
    this.users.splice(index, 1);
  }
}
