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
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(platform, camera, file, filePath, actionSheetCtrl, toastCtrl, afAuth, fb, navCtrl, navParams, loadingProvider) {
        this.platform = platform;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingProvider = loadingProvider;
        this.lastImage = null;
        this.regData = { name: '', mail: '', pass: '', cnfpass: '' };
        this.passwordtype = 'password';
        this.cnfpasswordtype = 'password';
        this.cnfpasseye = 'eye';
        this.passeye = 'eye';
        this.authForm = this.fb.group({
            'username': [null, Validators.compose([Validators.required])],
            'email': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required])],
            'cnfpass': [null, Validators.compose([Validators.required])]
        });
        this.username = this.authForm.controls['username'];
        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
        this.cnfpass = this.authForm.controls['cnfpass'];
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.doRegister = function (regData) {
        var _this = this;
        if (regData.pass == regData.cnfpass) {
            this.loadingProvider.startLoading();
            this.afAuth.auth.createUserWithEmailAndPassword(regData.mail, regData.pass)
                .then(function (result) {
                _this.loadingProvider.stopLoading();
                _this.presentToast('Ragister Successfully..!');
                _this.navCtrl.setRoot(LoginPage);
            }).catch(function (err) {
                _this.loadingProvider.stopLoading();
                console.log('err', err);
                _this.presentToast(err);
            });
        }
        else {
            this.presentToast('Both password are not matched!');
        }
    };
    RegisterPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    RegisterPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            alert('imagePath ' + imagePath);
            _this.cropImagePath = imagePath;
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    RegisterPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    RegisterPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        alert('pathName->>' + namePath + '->currentName-->' + currentName + '->newFileName-->' + newFileName);
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    RegisterPage.prototype.moveToLogin = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    RegisterPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    RegisterPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    RegisterPage.prototype.managePassword = function () {
        if (this.passwordtype == 'password') {
            this.passwordtype = 'text';
            this.passeye = 'eye-off';
        }
        else {
            this.passwordtype = 'password';
            this.passeye = 'eye';
        }
    };
    RegisterPage.prototype.managecnfPassword = function () {
        if (this.cnfpasswordtype == 'password') {
            this.cnfpasswordtype = 'text';
            this.cnfpasseye = 'eye-off';
        }
        else {
            this.cnfpasswordtype = 'password';
            this.cnfpasseye = 'eye';
        }
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [Platform, Camera, File, FilePath, ActionSheetController, ToastController, AngularFireAuth, FormBuilder, NavController, NavParams, LoadingProvider])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map