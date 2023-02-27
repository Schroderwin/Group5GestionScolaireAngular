import {Teacher} from "./teacher.model";
import {Institution} from "./institution.model";
import {Time} from "@angular/common";
import {GroupClass} from "./groupclass.model";
import {Subject} from "./subject.model";
import {Classroom} from "./classroom.model";

export interface ScheduleEvent {
  id: number,
  // name: string,
  date: Date,
  beginTime: Time,
  endTime: Time,
  teacher: Teacher,
  subject: Subject,
  groupClass: GroupClass,
  classroom: Classroom
}
