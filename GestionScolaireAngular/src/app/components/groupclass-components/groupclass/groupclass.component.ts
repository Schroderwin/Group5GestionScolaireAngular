import {Component, Input} from '@angular/core';
import {GroupClass} from "../../../model/groupclass.model";

@Component({
  selector: 'app-groupclass',
  templateUrl: './groupclass.component.html',
  styleUrls: ['./groupclass.component.css']
})
export class GroupclassComponent {

  @Input()
  groupClass!: GroupClass;

}
