var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { startOfDay, addHours } from 'date-fns';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.viewDate = new Date();
        this.view = 'week';
        this.locale = 'nl';
        this.isDragging = false;
        this.refresh = new Subject();
        this.todos = [0];
        this.events = [
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
    }
    HomePage.prototype.handleEvent = function (event) {
        var _this = this;
        console.log("testt");
        var alert = this.alertCtrl.create({
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
                    handler: function (inputData) {
                        // let navTransition = alert.dismiss();
                        _this.todos.push(inputData.duur);
                        console.log(_this.todos + "eventtt");
                    }
                }]
        });
        console.log("test1");
        alert.present();
    };
    HomePage.prototype.eventTimesChanged = function (_a) {
        var _this = this;
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        if (this.isDragging) {
            return;
        }
        this.isDragging = false;
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next();
        setTimeout(function () {
            _this.isDragging = false;
        }, 1000);
    };
    HomePage.prototype.hourSegmentClicked = function (event) {
        console.log("test1");
        console.log(this.todos[this.todos.length - 1] + "event1");
        var firstevent = {
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
        };
        this.events.push(firstevent);
        console.log(this.events + 'checkkk');
        this.refresh.next();
        console.log("test123");
        this.handleEvent(event);
        console.log("test1234");
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map