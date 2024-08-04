import { Component } from '@angular/core';
import { UserInputComponent } from './user-input/user-input.component';
import { UserListComponent } from './user-list/user-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    UserInputComponent,
    UserListComponent,
    WorkoutChartComponent
  ]
})
export class AppComponent {
  title = 'Health Challenge Tracker';
}