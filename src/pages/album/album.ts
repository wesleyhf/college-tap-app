import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    selector: 'page-album',
    templateUrl: 'album.html'
})

export class AlbumPage {
    album: any;

    constructor(public nav: NavController, private params: NavParams) {
        this.album = params.data.album;
    }

    ionViewDidLoad() {
        console.log('Hello Album Page');
    }

    takePicture(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 640,
            targetHeight: 480
        }).then((imageData) => {
            this.album.photos.push(`data:image/jpeg;base64,${imageData}`);
        }, (err) => {
            console.log(err);
        });
    }
}
