import {Component, Input} from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {Subject} from "../../../model/subject.model";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  @Input()
  subject!: Subject

}
