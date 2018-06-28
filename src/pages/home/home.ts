import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { MemberPage } from '../home/members';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData: any;
  newcardData = { dayndate: "", description: ""};
  authForm : FormGroup;
  dayndate: AbstractControl;
  description: AbstractControl;




  constructor(public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParam: NavParams, public loadingProvider: LoadingProvider) {

    this.authForm = this.fb.group({
      'dayndate' : [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
    });

    this.dayndate = this.authForm.controls['dayndate'];
    this.description = this.authForm.controls['description'];


    this.userData = this.navParam.get('res');
    console.log('userData', this.userData);
  }

  logout() {
    this.loadingProvider.startLoading();
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
    this.loadingProvider.stopLoading();
  }

  // submitCard(){
  //
  // }

  AdminNewCard(newcardData) {
    this.authForm = new FormGroup({
      dayndate: new FormControl(),
      description: new FormControl()
    });


    // var content = document.getElementById("content");
    // var newCard = document.createElement("ion-card");
    // var newItem = document.createElement("ion-item");
    // var newContent = document.createTextNode(newcardData.dayndate);
    // newCard.appendChild(newItem);
    // newItem.appendChild(newContent);
    // content.appendChild(newCard);

  }


}
