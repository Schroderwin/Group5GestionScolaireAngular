import { Component } from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../model/subject.model";
import {GroupClass} from "../../../model/groupclass.model";
import {Institution} from "../../../model/institution.model";
import {TeacherService} from "../../../services/teacher.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {InstitutionService} from "../../../services/institution.service";
import {SubjectService} from "../../../services/subject.service";
import {GroupClassService} from "../../../services/groupclass.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {

  teachers: Teacher[] = []
  private content: any

  ourForm!: FormGroup
  formsubmitted = false;

  subjects: Subject[] = []
  groupClasses: GroupClass[] = []

  institutions: Institution[] = []

  constructor(private ts: TeacherService, config: NgbModalConfig,
              private modalService: NgbModal, private router:Router,
              private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private insServ: InstitutionService,
              private subServ: SubjectService,
              private groupServ: GroupClassService, ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.ts.getAll(Number(id)).subscribe(t => this.teachers = t)
    this.insServ.getAll().subscribe(ins => this.institutions = ins)
    this.subServ.getAll(Number(id)).subscribe(sub => this.subjects = sub)
    this.groupServ.getAll(Number(id)).subscribe(grp => this.groupClasses = grp)
    this.ourForm = this.fb.group({
        name: ['', Validators.required],
        color: ['', Validators.required],
        institution: this.fb.group({
          id: ''
        })
      }
    )
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  submitForm() {
    const id=Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.formsubmitted = true
    if (this.ourForm.valid) {
      console.log("on est la")
      this.subServ.add(this.ourForm.value).subscribe(t => this.router.navigateByUrl(`/institution/${id}`))
    }

  }
}

