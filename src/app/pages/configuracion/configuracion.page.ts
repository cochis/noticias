import { Component, OnInit } from '@angular/core';
import { Article, Category } from 'src/app/interfaces/interfaces';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  form: FormGroup;
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
  constructor(private fb: FormBuilder, private newsService: ServicesService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit() {
    this.getArticles(this.selectedCategory.name);

  }
  changeCategory(event) {

    let category = event.detail.value;
    console.log('category', category)
    this.getArticles(category);

  }
  getArticles(category) {
    this.newsService.getTopHeadLineByCategory(category).subscribe(articles => {

      this.articles = articles;
      console.log('this.articles', this.articles)
    })
  }
  crearFormulario() {

    this.form = this.fb.group({
      categoria: ['', [Validators.required, Validators.minLength(5)]],
      frecuencia: [],
      font: ['', [Validators.required]],

    });

  }
  crearListeners() {
    this.form.valueChanges.subscribe(valor => {
      console.log(valor);
    });

    // this.forma.statusChanges.subscribe( status => console.log({ status }));
    // this.form.get('categoria').valueChanges.subscribe(console.log);
  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.form.reset({
      categoria: '',
      frecuencia: 3,
      font: '',
    });

  }
  visualizar() {
  }
}
