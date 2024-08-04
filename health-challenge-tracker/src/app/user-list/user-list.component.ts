import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = [];
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = this.users;
    this.workoutTypes = this.userService.getWorkoutTypes();
  }

  search(): void {
    this.applyFilters();
  }

  filterByWorkoutType(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedWorkoutType === '' || user.workouts.some(workout => workout.type === this.selectedWorkoutType))
    );
    this.currentPage = 1;
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }
}