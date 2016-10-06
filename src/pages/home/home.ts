import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// import { LoginPage } from '../login/login';
import { AlbumPage } from '../album/album';

import * as firebase from 'firebase';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    user: any = {};
    albums: any = [];

    constructor(public nav: NavController, private alert: AlertController) {
        firebase.initializeApp({
            apiKey: "AIzaSyCNqIMV6BjjMWX0EAvLNgm-9U-hUQmmXMA",
            authDomain: "faculdade-b1ea8.firebaseapp.com",
            databaseURL: "https://faculdade-b1ea8.firebaseio.com",
            storageBucket: "faculdade-b1ea8.appspot.com",
            messagingSenderId: "7518909020"
        });
    }

    ngOnInit() {
        // we will use anonymous auth for this example
        firebase.auth().signInAnonymously()
            .then((_auth) => {
                console.log('login success');
                // this.loadData();
            })
            // .catch((error: firebase.auth.Error) => {
            .catch((error: any) => {
                // var errorCode = error.code;
                alert(error.message);
            });
    }

    loadAlbums() {
        // firebase.database().ref('assets').on('value', (_snapshot: any) => {
        //     console.log(_snapshot);
        // });
    }

    addAlbum() {
        let alert = this.alert.create({
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
        this.nav.push(AlbumPage, { album });
    }
}
