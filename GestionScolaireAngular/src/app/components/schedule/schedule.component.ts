import {Component, ChangeDetectorRef, OnInit, ViewChild, Injectable} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, CalendarApi} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Teacher} from "../../model/teacher.model";
import {Subject} from "../../model/subject.model";
import {Classroom} from "../../model/classroom.model";
import {TeacherService} from "../../services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../services/subject.service";
import {ClassroomService} from "../../services/classroom.service";
import {ScheduleService} from "../../services/schedule.service";
import {GroupClass} from "../../model/groupclass.model";
import {GroupClassService} from "../../services/groupclass.service";


@Component({
  selector: 'app-root',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ScheduleComponent {
  events: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      timeGridPlugin,
    ],
    themeSystem: 'bootstrap',
    headerToolbar: false,
    views: {
      timeGridSixDay: {
        type: 'timeGrid',
        duration: {days: 6},
      }
    },

    dayHeaderFormat: {weekday: 'long'},
    initialView: 'timeGridSixDay',
    locale: 'fr',
    editable: true,
    selectable: true,
    selectMirror: true,
    // dayMaxEvents: true,
    initialDate: "2023-01-02",
    slotMinTime: '08:00',
    slotMaxTime: '20:00',
    select: this.handleSelect.bind(this),

    timeZone: 'local',
    eventClick: (info) => {
      const modalRef = this.modalService.open(this.content);
      modalRef.componentInstance.event = info.event;
    },
  };
  beginTime!: String;
  endTime!: String;
  date!: String;

  ourForm!: FormGroup
  formsubmitted = false;
  subjects!: Subject[]
  teachers: Teacher[] = []
  classrooms: Classroom[] = []
  groupClasses: GroupClass[] = []
  groupClass!: GroupClass;
  id!: string;
  startStr!: string;


  constructor(private changeDetector: ChangeDetectorRef, config: NgbModalConfig, private router: Router,
              private modalService: NgbModal, private ts: TeacherService, private activatedRoute: ActivatedRoute,
              private ss: SubjectService, private cs: ClassroomService, private fb: FormBuilder,
              private ses: ScheduleService, private gs: GroupClassService) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.gs.getOne(Number(this.id)).subscribe(c => {
      this.groupClass = c;

      this.ts.getAll(this.groupClass.institution.id).subscribe(t => this.teachers = t);
      this.ss.getAll(this.groupClass.institution.id).subscribe(s => this.subjects = s);
      this.cs.getAll(this.groupClass.institution.id).subscribe(c => this.classrooms = c);
      this.gs.getAll(this.groupClass.institution.id).subscribe(c => this.groupClasses = c);
    });
    this.ses.getAll(Number(this.id)).subscribe(scheduleEvents => {
      this.events = [];
        for (let se of scheduleEvents) {
          let startDate = new Date(se.date);
          let endDate = new Date(se.date);
          let beginTime: any = {
            beginTime: se.beginTime
          }
          startDate.setHours(beginTime.beginTime.toString().substring(0, 2))
          startDate.setMinutes(beginTime.beginTime.toString().substring(3, 5))

          let endTime: any = {
            endTime: se.endTime
          }
          endDate.setHours(endTime.endTime.toString().substring(0, 2))
          endDate.setMinutes(endTime.endTime.toString().substring(3, 5))

          this.events.push({
            id: se.id.toString(),
            title: se.subject.name,

            start: startDate,
            end: endDate
          });
        }
        this.calendarOptions.events = this.events;
      }
    );
  }

  @ViewChild('content') content: any;


  handleSelect(selectInfo: DateSelectArg) {

    this.date = new Date(selectInfo.startStr).toISOString().split('T')[0]
    this.startStr = new Date(selectInfo.startStr).toLocaleString('fr-FR', { weekday: 'long' })
    this.beginTime = new Date(selectInfo.start).toLocaleTimeString();
    this.endTime = new Date(selectInfo.end).toLocaleTimeString();


    this.ourForm = this.fb.group({
      date: ['', Validators.required],
      beginTime: ['', Validators.required],
      endTime: ['', Validators.required],
      teacher: this.fb.group({
        id: ['', Validators.required],
      }),
      subject: this.fb.group({
        id: ['', Validators.required]
      }),
      groupClass: this.fb.group({
        id: Number(this.id)
      }),
      classroom: this.fb.group({
        id: ['', Validators.required]
      })
    })

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    const modalRef = this.modalService.open(this.content);
  }

  submitForm() {
    this.formsubmitted =true;
    if (this.ourForm.valid) {
      console.log(this.ourForm.value)

      this.ses.add(this.ourForm.value).subscribe(t => {
          this.modalService.dismissAll();
          console.log("validation du form")
          window.location.reload();
        }
      );
    }

  }


// generer le PDF en utilisant jsPDF et html2canvas pour la capture d'écran
  generatePdf() {

    const doc = new jsPDF();

    const calendarEl = document.getElementById('calendar');

    // @ts-ignore
    html2canvas(calendarEl).then((canvas) => {
      const imgData = canvas.toDataURL('png');
      console.log(imgData)

      doc.addImage(imgData, 'png', 10, 10, 190, 190);

      doc.save('calendrier.pdf');
    });
  }

}
