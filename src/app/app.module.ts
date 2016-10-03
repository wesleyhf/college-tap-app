import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlbumPage } from '../pages/album/album';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AlbumPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AlbumPage
  ],
  providers: []
})
export class AppModule {}
