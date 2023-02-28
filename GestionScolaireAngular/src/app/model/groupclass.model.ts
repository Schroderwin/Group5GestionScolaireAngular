import {Teacher} from "./teacher.model";
import {Institution} from "./institution.model";
import {ScheduleEvent} from "./scheduleevent.model";

export interface GroupClass {
  id: number,
  name: string,
  teacher: Teacher,
  institution: Institution,
  scheduleEvents: ScheduleEvent[]
}
