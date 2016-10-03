import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-album',
    templateUrl: 'album.html'
})

export class AlbumPage {
    constructor(public navCtrl: NavController) {}

    ionViewDidLoad() {
        console.log('Hello Album Page');
    }
}
