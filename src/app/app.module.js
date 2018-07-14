var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Facebook } from '@ionic-native/facebook';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgetPage } from '../pages/forget/forget';
//Angular Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { CustomEventTitleFormatterProvider } from '../providers/custom-event-title-formatter/custom-event-title-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';
import { CalendarModule, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';
import { HttpClientModule } from '@angular/common/http';
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeNl);
export var firebaseConfig = {
    apiKey: "AIzaSyA9kCwJjSCBD7GqDXHygaKkB5QViCEXAk0",
    authDomain: "mcstproj-0909475.firebaseapp.com",
    databaseURL: "https://mcstproj-0909475.firebaseio.com",
    projectId: "mcstproj-0909475",
    storageBucket: "mcstproj-0909475.appspot.com",
    messagingSenderId: "840531115821"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                LoginPage,
                RegisterPage,
                ForgetPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                AngularFireModule.initializeApp(firebaseConfig),
                AngularFireDatabaseModule,
                AngularFireAuthModule,
                BrowserAnimationsModule,
                CalendarModule.forRoot(),
                CalendarWeekHoursViewModule,
                HttpClientModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                LoginPage,
                RegisterPage,
                ForgetPage
            ],
            providers: [
                StatusBar,
                Camera,
                File,
                FilePath,
                FileTransfer,
                Facebook,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                LoadingProvider,
                {
                    provide: CalendarDateFormatter,
                    useClass: CustomDateFormatterProvider
                },
                {
                    provide: CalendarEventTitleFormatter,
                    useClass: CustomEventTitleFormatterProvider
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map