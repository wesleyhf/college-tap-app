import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    user: any;

    name: string = '';
    password: string = '';

    constructor(public nav: NavController, private params: NavParams) {
        this.user = params.data.user;
    }

    ionViewDidLoad() {
        console.log('Hello Login Page');
    }

    checkAuth() {
        if (this.user.name === this.name && this.user.password === this.password) {
            this.user.active = true;
            this.nav.pop();
        } else {
            alert('Invalid login.');
        }
    }
}
