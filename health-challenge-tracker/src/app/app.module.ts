import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { UserListComponent } from './user-list/user-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    UserListComponent,
    WorkoutChartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }