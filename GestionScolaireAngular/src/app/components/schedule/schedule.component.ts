import {Component, ChangeDetectorRef, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {Teacher} from "../../model/teacher.model";
import {Subject} from "../../model/subject.model";
import {Classroom} from "../../model/classroom.model";


@Component({
  selector: 'app-root',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ScheduleComponent  {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      // dayGridPlugin,
      timeGridPlugin,
      // listPlugin,
    ],
    headerToolbar: false,
    views: {
      timeGridSixDay: {
        type: 'timeGrid',
        duration: {days: 6},
        // buttonText: '6 day'
      }
    },
    dayHeaderFormat: { weekday: 'long' },
    initialView: 'timeGridSixDay',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // weekends: true,
    locale: 'fr',
    editable: true,
    selectable: true,
    selectMirror: true,
    // dayMaxEvents: true,
    initialDate: "2023-01-02",
    slotMinTime: '08:00',
    slotMaxTime: '20:00',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    timeZone: 'local'


  };
  currentEvents: EventApi[] = [];


  startDay!: string;

  startTime!: string;
  endTime!: string;

  ourForm!: FormGroup
  formsubmitted = false;

  subjects!: Subject[]
  subject!: Subject

  teachers: Teacher[] = []
  classrooms: Classroom[] =[]

  constructor(private changeDetector: ChangeDetectorRef, config: NgbModalConfig,
              private modalService: NgbModal) {
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }



  @ViewChild('content') content: any;

  handleDateSelect(selectInfo: DateSelectArg) {

    this.modalService.open(this.content, { centered: true });
    const startDate = selectInfo.start;
    this.startDay = new Date(selectInfo.startStr).toLocaleString('fr-FR', { weekday: 'long' });
   this.startTime = selectInfo.startStr;
   this.endTime = selectInfo.endStr;




  }




  /*handleDateSelect(selectInfo: DateSelectArg) {
   /* const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
    this.modalService.open(this.content,  { windowClass : "myCustomModalClass"});
    selectInfo.startStr;


  }*/



  //ajouter un êvenment

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();

    }


  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();

  }

  open(content: any) {

  }


  submitForm() {
  /*  const id=Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.formsubmitted = true
    let teacher:Teacher = this.ourForm.value as Teacher
    teacher.subjects = new Array(this.ourForm.value.subject);
    console.log(teacher.subjects)
    if (this.ourForm.valid) {
      console.log(this.ourForm.value)
      console.log(teacher)
      this.ts.add(teacher).subscribe(t => this.router.navigateByUrl(`/institution/${id}/teacher`))
    }*/
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
