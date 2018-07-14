import {Component} from '@angular/core';

interface member {
  name: string;
  mail: string;
  admin: boolean;
}

@Component({
  selector: 'page-members',
  templateUrl: 'home.html'
})

export class MemberPage{

  zuidmembers: member[];

  constructor(){
    this.zuidmembers = [{
      name: "Furkan Andac",
      mail: "furkan_andac_@hotmail.com",
      admin: true
    },
    {
      name: "Admin yarrak",
      mail: "admin@gmail.com",
      admin: true
    }
  ]
  }
}
