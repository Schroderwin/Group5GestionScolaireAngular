import {Component, Input} from '@angular/core';
import {Classroom} from "../../../model/classroom.model";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent {

  @Input()
  classroom!: Classroom;

}
