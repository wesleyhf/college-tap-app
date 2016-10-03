import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    user: any = {};

    constructor(public navCtrl: NavController) {
        // this.pushPage = LoginPage;
        // this.params = {};
    }

    ngOnInit() {
        console.log('page home init');

        // check logged uer
        // if (this.user.name) {
            
        // } else {
        //     this.navCtrl.push(LoginPage);
        // }
    }
}
