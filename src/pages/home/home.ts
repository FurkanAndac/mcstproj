import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Title } from '@angular/platform-browser';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  viewDate: Date = new Date();
  view = 'week';
  locale: string = 'nl';
  isDragging = false;
  refresh: Subject<any> = new Subject();
  todos = [0];
  

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(startOfDay(new Date()), 9),
      title: 'First Event',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addHours(startOfDay(new Date()), 10),
      end: addHours(startOfDay(new Date()), 12),
      title: 'Second Event',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public af: AngularFireAuth) { }

  handleEvent(event: CalendarEvent): void {
    console.log("testt");
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          type: 'number',
          name: 'duur',
          placeholder: 'Duur werk'
        }
      ],
      title: "Plan taak",
      // message: event.start + ' to ' + event.end,
      buttons: [{
        text: "Cancel",

      },
      {
        text: "Save",
        handler: (inputData) => {
          // let navTransition = alert.dismiss();
          this.todos.push(inputData.duur);
          console.log(this.todos + "eventtt");
        }
      }]
    });
    console.log("test1");
    alert.present();
  }


  eventTimesChanged({event, newStart, newEnd} : CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = false;

    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();

    setTimeout(() => {
      this.isDragging = false;
    },1000);
  }


  hourSegmentClicked(event): void{
    

    console.log("test1")
    console.log(this.todos[this.todos.length - 1] + "event1")
    let firstevent: CalendarEvent = {
      start: event.date,
      end: addHours(event.date, this.todos[this.todos.length - 1]),
      title: "l0l0l",
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: false
    }
    this.events.push(firstevent);
    console.log(this.events + 'checkkk');
    this.refresh.next();
    console.log("test123");
    this.handleEvent(event);
    console.log("test1234");
    }
  

  

  // hourSegmentClicked(event): void {
  //   this.handleEvent(event);

  //   let newEvent: CalendarEvent = {
  //     start: event.date,
  //     end: addHours(event.date, 1),
  //     title: 'TEST EVENT',
  //     cssClass: 'custom-event',
  //     color: {
  //       primary: '#488aff',
  //       secondary: '#bbd0f5'
  //     },
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: false
  //   }


  //   this.events.push(newEvent);
  //   this.refresh.next();
  // }

}
