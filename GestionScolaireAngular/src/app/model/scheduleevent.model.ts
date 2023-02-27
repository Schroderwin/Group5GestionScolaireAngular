import {Teacher} from "./teacher.model";
import {Subject} from "./subject.model";
import {GroupClass} from "./groupclass.model";

export interface ScheduleEvent {
  id: number,
  name: string,
  date: string,
  beginTime : string,

  subject: Subject,

  groupClass: GroupClass
  teacher: Teacher,
}
