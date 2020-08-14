import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {
  }

  public ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  public ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  public login() {
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    },
    error => {});
  }
}
