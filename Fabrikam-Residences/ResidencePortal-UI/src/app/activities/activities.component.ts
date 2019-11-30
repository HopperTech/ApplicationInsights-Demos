import { Component, OnInit } from '@angular/core';
import { Activity } from './activity';
import { ActivityService } from './activity.service';
import { User } from '../auth/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  addingActivity = false;
  activities: any = [];
  selectedActivity: Activity;

  get user(): User {
    return this.auth.getAuthenticatedUser();
  }

  constructor(
    private activityService: ActivityService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getActivities();
  }

  cancel() {
    this.addingActivity = false;
    this.selectedActivity = null;
  }

  deleteActivity(activity: Activity) {
    this.activityService.deleteActivity(activity).subscribe(res => {
      this.getActivities();
      if (this.selectedActivity === activity) {
        this.selectedActivity = null;
      }
    });
  }

  getActivities() {
    return this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  enableAddMode() {
    this.addingActivity = true;
    this.selectedActivity = new Activity();
  }

  onSelect(activity: Activity) {
    this.addingActivity = false;
    this.selectedActivity = activity;
  }

  save() {
    if (this.addingActivity) {
      this.activityService
        .addActivity(this.selectedActivity)
        .subscribe(activity => {
          this.addingActivity = false;
          this.selectedActivity = null;
          this.activities.push(activity);
        });
    }
  }
}
