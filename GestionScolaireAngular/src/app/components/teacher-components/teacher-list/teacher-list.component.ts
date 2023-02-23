import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

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
  formsubmitted = false;

  constructor(private ts: TeacherService, config: NgbModalConfig, private modalService: NgbModal, private router:Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id_institution') || '';
    this.ts.getAll(Number(id)).subscribe(t => this.teachers = t)
    this.ourForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        subject: ['', Validators.required],
      birthDate: ['', Validators.required],
      capacity: ['', Validators.required],

      }
    )
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  submitForm() {
    this.formsubmitted = true
    if (this.ourForm.valid) {
      this.ts.add(this.ourForm.value).subscribe(t => this.router.navigateByUrl('1/teacher'))
    }

  }
}
