// import { Component, Type } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

// import { FilterArrayPipe } from '../../filters/filter-array-pipe';

import { LoginPage } from '../login/login';
import { AlbumPage } from '../album/album';
import { AboutPage } from '../about/about';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    // pipes: [FilterArrayPipe],
})

export class HomePage {
    user = {
        name: 'wesley',
        password: '123',
        active: false
    };

    // search: string = '';
    albums: any = [];

    constructor(public nav: NavController, private alert: AlertController) {
        this.loadAlbums();
    }

    ngOnInit() {
        if (! this.user.active) {
            this.nav.push(LoginPage, { user:this.user });
        }
    }

    ionViewWillEnter() {
        this.saveAlbums(null);
    }

    saveAlbums(album) {
        if (album) {
            this.albums.push(album);
        }

        NativeStorage.setItem('albums', this.albums)
        .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );
    }

    loadAlbums() {
        NativeStorage.getItem('albums')
        .then(
            albums => this.albums = albums,
            error => console.error(error)
        );
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
                        let album = {
                            'name': data.albumName,
                            'photos': [],
                        }

                        this.saveAlbums(album);
                    }
                }
            ]
        });

        alert.present();
    }

    goToAlbumPage(album) {
        this.nav.push(AlbumPage, { album });
    }

    goToAboutPage(album) {
        this.nav.push(AboutPage);
    }
}
