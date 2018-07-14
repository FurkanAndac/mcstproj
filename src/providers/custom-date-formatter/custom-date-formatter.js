var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CalendarDateFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { getISOWeek } from 'date-fns';
var CustomDateFormatterProvider = /** @class */ (function (_super) {
    __extends(CustomDateFormatterProvider, _super);
    function CustomDateFormatterProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomDateFormatterProvider.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'HH:mm', locale);
    };
    CustomDateFormatterProvider.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        var year = new DatePipe(locale).transform(date, 'y', locale);
        var weekNumber = getISOWeek(date);
        return "Week " + weekNumber + " in " + year + " @FAdienstverlening";
    };
    CustomDateFormatterProvider.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'E', locale);
    };
    CustomDateFormatterProvider.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MM/dd', locale);
    };
    CustomDateFormatterProvider = __decorate([
        Injectable()
    ], CustomDateFormatterProvider);
    return CustomDateFormatterProvider;
}(CalendarDateFormatter));
export { CustomDateFormatterProvider };
//# sourceMappingURL=custom-date-formatter.js.map