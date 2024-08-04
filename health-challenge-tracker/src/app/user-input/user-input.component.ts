import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserInputComponent implements OnInit {
  userForm!: FormGroup;
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      workouts: this.fb.array([], Validators.required)
    });
  }

  get workouts(): FormArray {
    return this.userForm.get('workouts') as FormArray;
  }

  addWorkout(): void {
    this.workouts.push(this.fb.group({
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  removeWorkout(index: number): void {
    this.workouts.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { name, workouts } = this.userForm.value;
      this.userService.addUserWorkouts(name, workouts);
      this.userForm.reset();
      while (this.workouts.length) {
        this.workouts.removeAt(0);
      }
    }
  }
}