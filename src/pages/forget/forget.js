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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
var ForgetPage = /** @class */ (function () {
    function ForgetPage(navCtrl, navParams, fb, afAuth, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.afAuth = afAuth;
        this.toast = toast;
        this.forgetData = { email: '' };
        this.authForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required])],
        });
        this.email = this.authForm.controls['email'];
        this.fireAuth = firebase.auth();
    }
    ForgetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPage');
    };
    ForgetPage.prototype.forgetPassword = function (email) {
        var _this = this;
        this.resetPassword(email)
            .then(function (result) {
            _this.toast.create({
                message: 'Link was send successfully!',
                duration: 3000,
                position: 'top'
            }).present();
            _this.navCtrl.setRoot(LoginPage);
        }, function (error) {
            _this.toast.create({
                message: error.message,
                duration: 5000,
                position: 'top'
            }).present();
        });
    };
    ForgetPage.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    ForgetPage.prototype.moveToLogin = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    ForgetPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forget',
            templateUrl: 'forget.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AngularFireAuth, ToastController])
    ], ForgetPage);
    return ForgetPage;
}());
export { ForgetPage };
//# sourceMappingURL=forget.js.map