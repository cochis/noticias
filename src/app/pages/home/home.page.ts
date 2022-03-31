import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/noticias1.jpg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/slides/noticias2.jpg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/slides/noticias3.jpg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    }
  ];
  constructor(private navCtrl: NavController) { }
  onClick() {
    this.navCtrl.navigateBack('/configuracion');
  }
}
