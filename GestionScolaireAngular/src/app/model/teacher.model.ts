import {Subject} from "./subject.model";
import {Institution} from "./institution.model";
import {GroupClass} from "./groupclass.model";
import {ScheduleEvent} from "./scheduleevent.model";

export interface Teacher {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  subjects: Subject[]

  groupClass: GroupClass,
  scheduleEvents: ScheduleEvent[],

  institution: Institution
}
