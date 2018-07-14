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
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading/loading';
import { Facebook } from '@ionic-native/facebook';
var LoginPage = /** @class */ (function () {
    function LoginPage(toastCtrl, fb, navCtrl, navParams, afAuth, loadingProvider, facebook) {
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.loadingProvider = loadingProvider;
        this.facebook = facebook;
        this.loginData = { email: '', password: '' };
        this.passwordtype = 'password';
        this.passeye = 'eye';
        this.authForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required])],
        });
        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    /*------------------
    --------------------*/
    // For User Login
    LoginPage.prototype.userLogin = function (loginData) {
        var _this = this;
        this.loadingProvider.startLoading();
        console.log('loginData', loginData);
        this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(function (result) {
            console.log('result >>', result);
            _this.loadingProvider.stopLoading();
            _this.moveToHome(result);
        }).catch(function (err) {
            _this.loadingProvider.stopLoading();
            console.log('err', err);
            _this.presentToast(err);
        });
    };
    // For Social Login
    LoginPage.prototype.socialLogin = function (isLogin) {
        var _this = this;
        if (isLogin == "facebook") {
            this.loadingProvider.startLoading();
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider).then(function () {
                _this.loadingProvider.startLoading();
                firebase.auth().getRedirectResult().then(function (result) {
                    console.log('result', result);
                    _this.moveToHome(result.user);
                    _this.loadingProvider.stopLoading();
                }).catch(function (error) {
                    this.loadingProvider.stopLoading();
                    alert(error.message);
                    console.log('error', error);
                });
                _this.loadingProvider.stopLoading();
            }).catch(function (error) {
                this.loadingProvider.stopLoading();
                alert(error.message);
                console.log('error', error);
            });
            this.loadingProvider.stopLoading();
        }
        else if (isLogin == "google") {
            this.loadingProvider.startLoading();
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider).then(function () {
                _this.loadingProvider.startLoading();
                firebase.auth().getRedirectResult().then(function (result) {
                    console.log('result', result);
                    _this.loadingProvider.stopLoading();
                    _this.moveToHome(result.user);
                }).catch(function (error) {
                    this.loadingProvider.stopLoading();
                    alert(error.message);
                    console.log('error', error);
                });
                _this.loadingProvider.stopLoading();
            }).catch(function (error) {
                this.loadingProvider.stopLoading();
                alert(error.message);
                console.log('error', error);
            });
            this.loadingProvider.stopLoading();
        }
        else if (isLogin == "twitter") {
            // this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
            // 	.then(res => {
            // 		 this.moveToHome(res);
            // 	})
            // 	.catch(err => console.log('err',err));
        }
        else if (isLogin == "github") {
            // this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
            // 	.then(res => {
            // 		 this.moveToHome(res);
            // 	})
            // 	.catch(err => console.log('err',err));
        }
    };
    // Move to register page
    LoginPage.prototype.moveToRegister = function () {
        this.navCtrl.setRoot(RegisterPage);
    };
    //Move to Home Page
    LoginPage.prototype.moveToHome = function (res) {
        console.log('res', res);
        this.navCtrl.setRoot(HomePage, { res: res });
    };
    LoginPage.prototype.presentToast = function (err) {
        var toast = this.toastCtrl.create({
            message: err.message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    LoginPage.prototype.presentAlert = function (err) {
    };
    LoginPage.prototype.managePassword = function () {
        if (this.passwordtype == 'password') {
            this.passwordtype = 'text';
            this.passeye = 'eye-off';
        }
        else {
            this.passwordtype = 'password';
            this.passeye = 'eye';
        }
    };
    LoginPage.prototype.forgetpassword = function () {
        this.navCtrl.setRoot(ForgetPage);
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
            providers: []
        }),
        __metadata("design:paramtypes", [ToastController, FormBuilder, NavController, NavParams, AngularFireAuth, LoadingProvider, Facebook])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map