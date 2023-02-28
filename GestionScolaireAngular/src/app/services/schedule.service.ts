import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupClass} from "../model/groupclass.model";
import {ScheduleEvent} from "../model/scheduleevent.model";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url = 'http://localhost:8082/gestionscolaire';

  constructor(private http: HttpClient) {
  }

  public getAll(idGroupclass: number): Observable<ScheduleEvent[]> {
    return this.http.get<ScheduleEvent[]>(`${this.url}/groupclass/${idGroupclass}/event`);
  }

  getOne(id: number): Observable<ScheduleEvent> {
    return this.http.get<ScheduleEvent>(`${this.url}/event/${id}`);
  }

  add(event: ScheduleEvent): Observable<ScheduleEvent> {
    return this.http.post<ScheduleEvent>(`${this.url}/event`, event);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/event/${id}`);
  }
}
