import { Injectable, Testability } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from './activity';

import { environment } from '../../environments/environment';

const api = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivities() {
    return this.http.get<Array<Activity>>(`${api}/activities`);
  }

  deleteActivity(activity: Activity) {
    return this.http.delete(`${api}/activities/${activity.id}`);
  }

  addActivity(activity: Activity) {
    return this.http.post<Activity>(`${api}/activities`, activity);
  }
}
