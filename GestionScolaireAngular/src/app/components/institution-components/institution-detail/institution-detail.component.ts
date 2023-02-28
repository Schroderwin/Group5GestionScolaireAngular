import { Component } from '@angular/core';
import {Institution} from "../../../model/institution.model";
import {ActivatedRoute, Router} from "@angular/router";
import {InstitutionService} from "../../../services/institution.service";
import {FormBuilder} from "@angular/forms";
import {TeacherService} from "../../../services/teacher.service";
import {ClassroomService} from "../../../services/classroom.service";
import {SubjectService} from "../../../services/subject.service";
import {GroupClassService} from "../../../services/groupclass.service";
import {Teacher} from "../../../model/teacher.model";
import {Classroom} from "../../../model/classroom.model";
import {GroupClass} from "../../../model/groupclass.model";
import {Subject} from "../../../model/subject.model";

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent {

  institution!: Institution

  teachers: Teacher[]=[]
  classrooms: Classroom[]=[]
  groupClasses: GroupClass[]=[]
  subjects: Subject[]=[]

  constructor(private route:ActivatedRoute,
              private is: InstitutionService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private teacherServ: TeacherService,
              private classroomServ: ClassroomService,
              private subjectServ: SubjectService,
              private groupClassServ: GroupClassService) {
  }

  ngOnInit(): void {
    console.log("Je suis dans le init")
    // const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
    const id=this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.is.getOne(Number(id)).subscribe(p => this.institution = p)
      this.teacherServ.getAll(Number(id)).subscribe(t=>this.teachers = t)
      this.subjectServ.getAll(Number(id)).subscribe(g=>this.subjects = g)
      this.groupClassServ.getAll(Number(id)).subscribe(g=>this.groupClasses = g)
      this.classroomServ.getAll(Number(id)).subscribe(c=>this.classrooms = c)
    }
  }

  deleteInstitution(){
    this.is.delete(this.institution.id)
      .subscribe(v => this.router.navigateByUrl('/institution'))
  }

}
