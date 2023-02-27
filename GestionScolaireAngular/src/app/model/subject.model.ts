import {Institution} from "./institution.model";
import {ScheduleEvent} from "./scheduleevent.model";

export interface Subject {
  id: number,
  name: string,
  color: string

  scheduleEvents: ScheduleEvent[],

  institution: Institution
}
