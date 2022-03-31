import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article, Category } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal-control',
  templateUrl: './modal-control.page.html',
  styleUrls: ['./modal-control.page.scss'],
})
export class ModalControlPage implements OnInit {
  @Input() frecuencia: string;
  @Input() categoria: string;
  @Input() font: string;
  @Input() dateI: string;
  @Input() dateF: string;

  articles: Article[];
  public categories: Category[] = [
    { name: 'business', description: 'Negocios' },
    { name: 'entertainment', description: 'Entretenimiento' },
    { name: 'health', description: 'Salud' },
    { name: 'science', description: 'Ciencia' },
    { name: 'technology', description: 'Tecnología' },
    { name: 'sports', description: 'Deportes' }
  ];
  public fonts: Category[] = [
    { name: "font-family: 'Acme', sans - serif;", description: "Acme" },
    { name: "font-family: 'Bebas Neue', cursive;", description: "Bebas" },
    { name: "font-family: 'Homemade Apple', cursive;", description: "Homemade" },
    { name: "font-family: 'Hurricane', cursive;", description: "Hurricane" },
    { name: "font-family: 'Indie Flower', cursive;", description: "Indie" },
    { name: "font-family: 'Oswald', sans - serif;", description: "Oswald" },
    { name: "font-family: 'Parisienne', cursive;", description: "Parisienne" },
    { name: "font-family: 'Passions Conflict', cursive;", description: "Passions" },
    { name: "font-family: 'Permanent Marker', cursive;", description: "Permanent" },
    { name: "font-family: 'Press Start 2P', cursive;", description: "Press" }

  ];
  public selectedCategory: Category = this.categories[0];

  update = {
    categoria: '',
    font: '',
    frecuencia: '',
    minDate: '',
    maxDate: '',
    last: false

  }
  updateD = false;
  disable = false;
  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {
    console.log('frecuencia', this.frecuencia)
    console.log('categoria', this.categoria)
    console.log('font', this.font)
    console.log('dateI', this.dateI)
    console.log('dateF', this.dateF)
    this.update = {
      categoria: this.categoria,
      font: this.font,
      frecuencia: this.frecuencia,
      minDate: this.dateI,
      maxDate: this.dateF,
      last: this.disable

    }
  }
  upDateDate(event) {
    console.log('event', event)
    if (event.detail.checked) {
      this.updateD = true;
    } else {
      this.updateD = false;

    }

  }

  lastNews(event) {
    console.log('event', event)
    if (event.detail.checked) {
      this.disable = true;
    } else {
      this.disable = false;

    }
  }
  updateParams(form: NgForm) {
    console.log('form', form.value)
    let ret = form.value;
    this.modalCtrl.dismiss({
      ret
    });
  }
  cancelar() {
    this.modalCtrl.dismiss();
  }


}
