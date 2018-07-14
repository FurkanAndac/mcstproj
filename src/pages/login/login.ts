import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { LoadingProvider } from '../../providers/loading/loading';

import { Facebook } from '@ionic-native/facebook'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : []
})
export class LoginPage {

	userData:any;
	loginData = { email:'', password:'' };
	authForm : FormGroup;
	email: AbstractControl;
	password: AbstractControl;
  passwordtype:string='password';
  passeye:string ='eye';
  constructor(public toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,public loadingProvider: LoadingProvider,public facebook: Facebook) {
  	this.authForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });

        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

/*------------------
--------------------*/

// For User Login

  userLogin(loginData){
    this.loadingProvider.startLoading();
  	console.log('loginData',loginData);
  		this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
        .then(result => {
          console.log('result >>',result);
          this.loadingProvider.stopLoading();
          this.moveToHome(result);
        }).catch(err => {
          this.loadingProvider.stopLoading();
          console.log('err',err);
          this.presentToast(err);
        });
  }


// For Social Login

  socialLogin(isLogin){
  	if (isLogin == "facebook"){
      this.loadingProvider.startLoading();

      let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(() => {
          this.loadingProvider.startLoading();
            firebase.auth().getRedirectResult().then((result)=>{
              console.log('result',result);
              this.moveToHome(result.user);
              this.loadingProvider.stopLoading();
            }).catch(function(error){
              this.loadingProvider.stopLoading();
              alert(error.message);
              console.log('error',error);
            })
            this.loadingProvider.stopLoading();
        }).catch(function(error){
          this.loadingProvider.stopLoading();
          alert(error.message);
          console.log('error',error);
        })
        this.loadingProvider.stopLoading();
  	}else if(isLogin == "google"){
      this.loadingProvider.startLoading();
      let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(() => {
          this.loadingProvider.startLoading();
            firebase.auth().getRedirectResult().then((result)=>{
              console.log('result',result);
              this.loadingProvider.stopLoading();
              this.moveToHome(result.user);
            }).catch(function(error){
              this.loadingProvider.stopLoading();
              alert(error.message);
              console.log('error',error);
            })
            this.loadingProvider.stopLoading();
        }).catch(function(error){
          this.loadingProvider.stopLoading();
          alert(error.message);
          console.log('error',error);
        })
        this.loadingProvider.stopLoading();
  	}else if(isLogin == "twitter"){
  		// this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      // 	.then(res => {
      // 		 this.moveToHome(res);
      // 	})
      // 	.catch(err => console.log('err',err));
  	}else if(isLogin == "github"){
  		// this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      // 	.then(res => {
      // 		 this.moveToHome(res);
      // 	})
      // 	.catch(err => console.log('err',err));
  	}

  }

  // Move to register page
  moveToRegister(){
  	this.navCtrl.setRoot(RegisterPage);
  }

  //Move to Home Page
  moveToHome(res){
  	console.log('res',res);
  	this.navCtrl.setRoot(HomePage,{res:res});
  }

  presentToast(err) {
  const toast = this.toastCtrl.create({
    message: err.message,
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}
presentAlert(err) {

}

managePassword() {
  if(this.passwordtype == 'password'){
    this.passwordtype='text';
    this.passeye='eye-off';
  }else{
    this.passwordtype='password';
    this.passeye = 'eye';
  }
}
forgetpassword(){
  this.navCtrl.setRoot(ForgetPage);
}

}
