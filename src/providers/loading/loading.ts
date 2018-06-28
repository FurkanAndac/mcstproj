import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular'
import 'rxjs/add/operator/map';

@Injectable()
export class LoadingProvider {
loading:any;
  constructor(public loadingCtrl: LoadingController) {


  }
  startLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      this.loading.present()
  }
  stopLoading(){
    setTimeout(() => {
      this.loading.dismiss();
    }, 100);
  }
}
