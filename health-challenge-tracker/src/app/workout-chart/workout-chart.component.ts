import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, LinearScale, BarElement, Title, Tooltip, Legend, BarController, CategoryScale } from 'chart.js';
import { UserService } from '../services/user.service';

// Register required components
Chart.register(LinearScale, BarElement, Title, Tooltip, Legend, BarController, CategoryScale);

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class WorkoutChartComponent implements OnInit {
  chart: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const users = this.userService.getUsers();
    const workoutTypes = this.userService.getWorkoutTypes();
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
    const datasets = workoutTypes.map((type,ind) => ({
      label: type,
      data: users.map(user =>
        user.workouts.filter((w: any) => w.type === type).reduce((sum: number, w: any) => sum + w.minutes, 0)
      ),
      backgroundColor: colors[ind]
    }));

    this.chart = new Chart('workoutChart', {
      type: 'bar',
      data: {
        labels: users.map(user => user.name),
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Minutes'
            }
          }
        }
      }
    });
  }
}