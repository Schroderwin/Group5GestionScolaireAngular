import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Institution} from "../../../model/institution.model";
import {InstitutionService} from "../../../services/institution.service";
import {GroupClass} from "../../../model/groupclass.model";
import {Subject} from "../../../model/subject.model";
import {SubjectService} from "../../../services/subject.service";
import {GroupClassService} from "../../../services/groupclass.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class TeacherListComponent implements  OnInit {

  /*selectedTeacher: Teacher | undefined;*/


  teachers: Teacher[] = []
  private content: any

  ourForm!: FormGroup
  ourForm2!: FormGroup
  formsubmitted = false;
  formsubmitted2 = false;

  // @ts-ignore
  plageNbrSubject: number[]= Array(3).fill().map((x,i)=>i+1); // [1,2,3]

  nbrSubject!: number
  subjects!: Subject[]
  subject!: Subject


  groupClasses: GroupClass[] = []
  groupClass!: GroupClass

  institutions: Institution[] = []

  addSubjects() {
    for(let i = 0; i < this.nbrSubject; i++)
    console.log(this.nbrSubject)
    console.log(this.ourForm.get("subjects")?.value)
    this.ourForm.value.subjects.push(new FormControl({id: ''}).value);
    console.log(this.ourForm.get("subjects")?.value)
  }

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
    // @ts-ignore
    const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.ts.getAll(Number(id)).subscribe(t => this.teachers = t)
    this.insServ.getAll().subscribe(ins => this.institutions = ins)
    this.subServ.getAll(Number(id)).subscribe(sub => this.subjects = sub)
    this.groupServ.getAll(Number(id)).subscribe(grp => this.groupClasses = grp)
    this.ourForm2 = this.fb.group({
      nbrSubject: ['', Validators.required]})
    this.ourForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      subject1: this.fb.group({
        id: ['', Validators.required]
      }),
      subject2: this.fb.group({
        id: ''
      }),
      subject3: this.fb.group({
        id: ''
      }),
      institution: this.fb.group({
        id: ['', Validators.required]
        })
      })
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }


  submitForm() {
    const id=Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.formsubmitted = true
    let teacher:Teacher = this.ourForm.value as Teacher
    teacher.subjects = new Array();
    let arr = [this.ourForm.value.subject1, this.ourForm.value.subject2,this.ourForm.value.subject3];

    for (var val of arr) {
      if(val.id!='')
      teacher.subjects.push(val); // prints values: 10, 20, 30, 40
    }
    console.log(teacher.subjects)
    if (this.ourForm.valid) {
      console.log(this.ourForm.value)
      console.log(teacher)
      this.ts.add(teacher).subscribe(t => this.router.navigateByUrl(`/institution/${id}/teacher`))
    }
  }

  submitForm2() {
    this.formsubmitted2 = true
    if (this.ourForm2.valid) {
      this.nbrSubject = this.ourForm2.value
      this.addSubjects()
    }
  }

}
