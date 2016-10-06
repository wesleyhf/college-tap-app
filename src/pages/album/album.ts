import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';

import * as firebase from 'firebase';

// import 'whatwg-fetch';

// declare var window: any;

@Component({
    selector: 'page-album',
    templateUrl: 'album.html'
})

export class AlbumPage {
    album: any;

    constructor(public nav: NavController, private params: NavParams, public platform: Platform) {
        this.album = params.data.album;
    }

    ionViewDidLoad() {
        console.log('Hello Album Page');
    }

    takePicture() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 640,
            targetHeight: 480
            // correctOrientation: true
        }).then((imageData) => {
            console.log(imageData);

            let imageBlob = this.base64toBlob(imageData);

            return this.upload(imageBlob);
        });
        // .then(snapshot: any => {
        //     console.log(`snapshot uploaded successfully ${snapshot.downloadURL}`);
        //
        //     // store reference to storage in database
        //     return this.saveToAssetList(snapshot);
        // }).then(snapshot: any => {
        //     console.log('snapshot saved to asset catalog successfully');
        // }, error => {
        //     alert(`Error: ${error.message}`);
        // });
    }

    base64toBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], {type: mimeString});
    }

    // @TODO: check if necessary
    // makeFileIntoBlob(imagePath) {
    //     if (this.platform.is('android')) {
    //         return new Promise((resolve, reject) => {
    //             window.resolveLocalFileSystemURL(imagePath, (fileEntry) => {
    //                 fileEntry.file((resFile) => {
    //                     let reader = new FileReader();
    //
    //                     reader.onloadend = (evt: any) => {
    //                         let imgBlob: any = new Blob([evt.target.result], {
    //                             type: 'image/jpeg'
    //                         });
    //
    //                         imgBlob.name = 'sample.jpg';
    //
    //                         resolve(imgBlob);
    //                     };
    //
    //                     reader.onerror = (e) => {
    //                         console.log('Failed file read: ' + e.toString());
    //                         reject(e);
    //                     };
    //
    //                     reader.readAsArrayBuffer(resFile);
    //                 });
    //             });
    //         });
    //     } else {
    //         return fetch(imagePath).then((response) => {
    //             return response.blob();
    //         }).then((blob) => {
    //             return blob;
    //         }).catch((error) => {
    //             alert(JSON.stringify(error.message));
    //         });
    //     }
    // }

    upload(imageBlob) {
        // @TODO: check path works
        let fileName = `photo-${new Date().getTime()}.jpg`;

        return new Promise((resolve, reject) => {
            let fileRef = firebase.storage().ref(`images/${this.album.id}/${fileName}`);

            let uploadTask = fileRef.put(imageBlob);

            // progress
            uploadTask.on('state_changed', (snapshot) => {
                console.log('snapshot progess ' + snapshot);
            }, (error) => {
                reject(error);
            }, () => {
                resolve(uploadTask.snapshot);
            });
        });
    }

    saveToAssetList(snapshot) {
        let ref = firebase.database().ref('assets');

        return new Promise((resolve, reject) => {
            // add meta data of image in database
            ref.push({
                'URL': snapshot.downloadURL,
                'name': snapshot.metadata.name,
                'owner': firebase.auth().currentUser.uid,
                'email': firebase.auth().currentUser.email,
                'lastUpdated': new Date().getTime()
            }, response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
