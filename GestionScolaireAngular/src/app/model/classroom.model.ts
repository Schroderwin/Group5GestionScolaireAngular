import {Subject} from "./subject.model";
import {Institution} from "./institution.model";
import {ScheduleEvent} from "./scheduleevent.model";

export interface Classroom {
  id: number,
  name: string,
  excludedSubjects: Subject[],
  capacity: number,
  institution: Institution,
  scheduleEvents: ScheduleEvent[]
}
