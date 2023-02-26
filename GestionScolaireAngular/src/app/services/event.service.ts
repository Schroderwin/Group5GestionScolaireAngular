import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupClass} from "../model/groupclass.model";


@Injectable({
  providedIn: 'root'
})
export class GroupClassService {
  url = 'http://localhost:8083/gestionscolaire';

  constructor(private http: HttpClient) {
  }

  public getAll(idGroupclass: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}/groupclass/${idGroupclass}/event`);
  }

  getOne(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.url}/event/${id}`);
  }

  add(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.url}/event`, event);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/event/${id}`);
  }
}
