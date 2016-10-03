import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-album',
    templateUrl: 'album.html'
})

export class AlbumPage {
    album: any;

    constructor(public navCtrl: NavController, private navParams: NavParams) {
        this.album = navParams.get('album');
    }

    ionViewDidLoad() {
        console.log('Hello Album Page');
    }
}
