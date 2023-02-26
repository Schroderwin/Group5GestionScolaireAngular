import {Teacher} from "./teacher.model";
import {Institution} from "./institution.model";
import {Time} from "@angular/common";
import {GroupClass} from "./groupclass.model";

export interface Event {
  id: number,
  name: string,
  date: Date,
  beginTime: Time,
  endTime: Time,
  groupClass: GroupClass
}
