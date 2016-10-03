import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AlbumPage } from '../album/album';

import * as firebase from 'firebase';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    user: any = {};

    constructor(public navCtrl: NavController) {
        // this.pushPage = LoginPage;
        // this.params = {};

        // Firebase.initializeApp({
        //
        // });
    }

    ngOnInit() {
        console.log('page home init');

        // check logged uer
        // if (this.user.name) {

        // } else {
        //     this.navCtrl.push(LoginPage);
        // }
    }

    loadAlbums() {
        Firebase.database().ref('assets').on('value', (_snapshot: any) => {
            console.log(_snapshot);
        });
    }

    goToAlbumPage() {
        this.navCtrl.push(AlbumPage);
    }
}
