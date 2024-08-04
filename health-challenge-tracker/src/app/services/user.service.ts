import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  addUserWorkouts(name: string, workouts: Workout[]): void {
    const existingUser = this.users.find(u => u.name === name);
    if (existingUser) {
      existingUser.workouts.push(...workouts);
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        name,
        workouts
      };
      this.users.push(newUser);
    }
    this.saveToLocalStorage();
  }

  getWorkoutTypes(): string[] {
    const types = new Set<string>();
    this.users.forEach(user => {
      user.workouts.forEach(workout => types.add(workout.type));
    });
    return Array.from(types);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}