import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Institution} from "../model/institution.model";
import {Observable} from "rxjs";
import {Teacher} from "../model/teacher.model";
import {GroupClass} from "../model/groupclass.model";
import {ScheduleEvent} from "../model/scheduleevent.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  url = 'http://localhost:8083/gestionscolaire';
  constructor(private http: HttpClient) {
  }


  public getAll(idGRP: number): Observable<ScheduleEvent[]> {
    return this.http.get<ScheduleEvent[]>(`${this.url}/groupclass/{idGRP}/event`)
  }


 /* getOne(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/teacher/${id}`);
  }*/

  add(scheduleEvent: ScheduleEvent): Observable<ScheduleEvent> {
    return this.http.post<ScheduleEvent>(`${this.url}/event`, scheduleEvent);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/event/${id}`);
  }


}
