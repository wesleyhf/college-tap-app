import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AlbumPage } from '../album/album';

// import * as firebase from 'firebase';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    user: any = {};
    albums: any = [];

    constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
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

    addAlbum() {
        let alert = this.alertCtrl.create({
            title: 'New Album',
            inputs: [
                {
                    name: 'albumName',
                    placeholder: 'Album name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Create',
                    handler: data => {
                        let id = data.albumName
                            .trim()
                            .replace(/\s/g, '_');

                        this.albums.push({
                            'id': id,
                            'name': data.albumName,
                            'photos_count': 0
                        });

                        console.log(this.albums);
                    }
                }
            ]
        });

        alert.present();
    }

    goToAlbumPage(album) {
        this.navCtrl.push(AlbumPage, {
            'album': album
        });
    }
}
