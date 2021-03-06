import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlbumPage } from '../pages/album/album';
import { AboutPage } from '../pages/about/about';
// import { FilterArrayPipe } from '../filters/filter-array-pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AlbumPage,
    AboutPage,
    // FilterArrayPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AlbumPage,
    AboutPage,
    // FilterArrayPipe
  ],
  providers: []
})
export class AppModule {}
