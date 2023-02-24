import { Component } from '@angular/core';
import {InstitutionComponent} from "../institution/institution.component";
import {Institution} from "../../../model/institution.model";
import {InstitutionService} from "../../../services/institution.service";
import {Teacher} from "../../../model/teacher.model";
import {Classroom} from "../../../model/classroom.model";
import {GroupClass} from "../../../model/groupclass.model";
import {Subject} from "../../../model/subject.model";
import {TeacherService} from "../../../services/teacher.service";
import {ClassroomService} from "../../../services/classroom.service";
import {SubjectService} from "../../../services/subject.service";
import {GroupClassService} from "../../../services/groupclass.service";

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css']
})
export class InstitutionListComponent {

  institutions: Institution[] = []

  teachers: Teacher[]=[]
  classrooms: Classroom[]=[]
  groupClasses: GroupClass[]=[]
  subjects: Subject[]=[]

  constructor(private is: InstitutionService,
              private teacherServ: TeacherService,
              private classroomServ: ClassroomService,
              private subjectServ: SubjectService,
              private groupClassServ: GroupClassService) {} // il est recommandé de juste déclarer les valeurs ici

  ngOnInit(): void{ // et c'est ici qu'on les initialise ( qu'on leur attribue une valeur )
    this.is.getAll().subscribe(v => this.institutions = v)
  }

}
