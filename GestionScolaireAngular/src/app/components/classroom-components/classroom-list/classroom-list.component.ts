import { Component } from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupClass} from "../../../model/groupclass.model";
import {Institution} from "../../../model/institution.model";
import {TeacherService} from "../../../services/teacher.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {InstitutionService} from "../../../services/institution.service";
import {GroupClassService} from "../../../services/groupclass.service";
import {ClassroomService} from "../../../services/classroom.service";
import {Subject} from "../../../model/subject.model";
import {SubjectService} from "../../../services/subject.service";
import {Classroom} from "../../../model/classroom.model";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent {

  classrooms: Classroom[] = []
  private content: any

  ourForm!: FormGroup
  formsubmitted = false;

  subjects: Subject[] = []

  excludedSubject!: Subject

  institutions: Institution[] = []

  constructor(config: NgbModalConfig,
              private modalService: NgbModal, private router:Router,
              private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private insServ: InstitutionService,
              private subServ: SubjectService,
              private roomServ: ClassroomService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.insServ.getAll().subscribe(ins => this.institutions = ins)
    this.subServ.getAll(Number(id)).subscribe(sub => this.subjects = sub)
    this.roomServ.getAll(Number(id)).subscribe(room => this.classrooms = room)
    this.ourForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      excludedSubject: this.fb.group({
        id: ''
      }),
      institution: this.fb.group({
        id: ''
      })
    })
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  submitForm() {
    const id=Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.formsubmitted = true
    let classroom:Classroom = this.ourForm.value as Classroom
    classroom.excludedSubjects = new Array(this.ourForm.value.excludedSubject);
    console.log(classroom.excludedSubjects)
    if (this.ourForm.valid) {
      this.roomServ.add(this.ourForm.value).subscribe(t => this.router.navigateByUrl(`/institution/${id}/classroom`))
    }
  }

}
