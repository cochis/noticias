import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { ServicesService } from 'src/app/services/services.service';
import { ModalControlPage } from '../modal-control/modal-control.page';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  category: "";
  frecuency = 0;
  font: "";
  dateI;
  dateF;
  lastNews = false;
  ready = false;
  interval: any;
  article: Article;
  articles: Article[];
  loading: HTMLIonLoadingElement;
  constructor(private activatedRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    private newsService: ServicesService,
    private modalCtrl: ModalController) {

    this.getParams();
  }

  ngOnInit() {


  }
  getParams() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params.category;
      console.log('this.category', this.category)
      this.frecuency = Number(params.frecuency) * 1000;
      console.log('this.frecuency', this.frecuency)
      this.font = params.font;
      console.log('this.font', this.font)
      this.getArticles(this.category, this.dateI, this.dateF).subscribe(res => {
        console.log('this.dateF', this.dateF)
        console.log('this.dateI', this.dateI)
        this.articles = res;
        console.log('this.articles', this.articles)
        this.ready = true;
      });
      this.interval = setInterval(() => {
        this.ready = false;
        this.dateI = undefined;
        this.dateF = undefined;
        console.log('this.dateF', this.dateF)
        console.log('this.dateI', this.dateI)
        this.getArticles(this.category, this.dateI, this.dateF).subscribe(res => {
          if (res !== this.articles) {
            console.log('articulos diferentes')
          } else {

            console.log('articulos iguales')
          }
          this.articles = res;
          console.log('this.articles', this.articles)
          this.ready = true;
        });
      }, this.frecuency);
    });
  }


  getArticles(category, dateI?, dateF?, last?) {
    if (last) {

      return this.newsService.getTopHeadLineByCategory(category, dateI, dateF, last);
    } else {

      return this.newsService.getTopHeadLineByCategory(category, dateI, dateF);
    }
    // setTimeout(() => {
    //   this.newsService.getTopHeadLineByCategory(category).subscribe(articles => {

    //     return articles;

    //   })
    // }, (frecuency * 1000));


  }
  async mostrarModal() {

    const modal = await this.modalCtrl.create({
      component: ModalControlPage,
      componentProps: {
        categoria: this.category,
        font: this.font,
        frecuencia: this.frecuency,
        minDate: this.dateI,
        maxDate: this.dateF
      }
    });

    await modal.present();

    // const { data } = await modal.onDidDismiss();
    const { data } = await modal.onWillDismiss();
    if (data != undefined) {
      this.ready = false;
      this.category = data.ret.categoria;
      this.font = data.ret.font;
      this.frecuency = data.ret.frecuencia;
      this.dateI = data.ret.minDate;
      let dI = new Date(this.dateI);
      let monthI = '' + (dI.getMonth() + 1);
      console.log('monthI.length', monthI.length)
      if (monthI.length == 1) {
        monthI = '0' + monthI;
      }
      let dayI = '' + dI.getDate();
      console.log('dayI', dayI)
      if (dayI.length == 1) {
        dayI = '0' + dayI;
      }
      let yearI = dI.getFullYear();
      let fDateI = yearI + '-' + monthI + '-' + dayI;

      this.dateF = data.ret.maxDate;
      let dF = new Date(this.dateF)
      let monthF = '' + (dF.getMonth() + 1);
      if (monthF.length == 1) {
        monthF = '0' + monthF;
      }
      let dayF = '' + dF.getDate();
      if (dayF.length == 1) {
        dayF = '0' + dayF;
      }
      let yearF = dF.getFullYear();
      let fDateF = yearF + '-' + monthF + '-' + dayF;
      this.lastNews = data.ret.last;
      if (this.lastNews) {

        this.getArticles(this.category, fDateI, fDateF, true).subscribe(res => {
          this.articles = res;
          console.log('this.articles', this.articles)
          this.ready = true;
        });
      } else {

        this.getArticles(this.category, fDateI, fDateF).subscribe(res => {
          this.articles = res;
          console.log('this.articles', this.articles)
          this.ready = true;
        });
      }
    }


  }
}
