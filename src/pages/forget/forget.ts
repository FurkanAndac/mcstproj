import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  forgetData:any= {email : ''}
  authForm : FormGroup;
  email: AbstractControl;
  public fireAuth: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,public afAuth: AngularFireAuth, public toast : ToastController) {
    this.authForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.required])],
    });
    this.email = this.authForm.controls['email'];

     this.fireAuth = firebase.auth();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  forgetPassword(email){
    this.resetPassword(email)
    .then(result => {
      this.toast.create({
        message: 'Link was send successfully!',
        duration: 3000,
        position: 'top'
      }).present();

      this.navCtrl.setRoot(LoginPage);
    }, error => {
      this.toast.create({
        message: error.message,
        duration: 5000,
        position: 'top'
      }).present();
    })
  }
  resetPassword(email: string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  moveToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
