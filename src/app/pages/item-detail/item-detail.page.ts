import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Observable} from "rxjs";
import {Item} from "../../models/item.model";
import {ActivatedRoute} from "@angular/router";
import {ItemListService} from "../../services/item-list.service";
import {IonicModule} from "@ionic/angular";
import {ItemFavoritesService} from "../../services/item-favorites.service";
import {UserAuthService} from "../../services/user-auth.service";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemDetailPage implements OnInit {

  item$!: Observable<Item>;
  itemId!: string;
  isFavorito = false;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private favoritosService: ItemFavoritesService,
    private authService: UserAuthService,
    private itemListService: ItemListService
  ) {}

  /*
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.item$ = this.itemListService.getItemById(this.itemId);

    if (this.authService.getCurrentUser()) {
      this.favoritosService.isFavorito(this.itemId).then(result => {
        this.isFavorito = result;
      });
    }
  }
  */

  /*
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.item$ = this.itemListService.getItemById(this.itemId);
  }
  */

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.item$ = this.itemListService.getItemById(this.itemId);

    this.authService.currentUser$.subscribe(user => {
      this.user = user;

      // Solo consultar favoritos si está logeado
      if (user) {
        this.favoritosService.isFavorito(this.itemId).then(result => {
          this.isFavorito = result;
        });
      }
    });
  }

  async toggleFavorito(item: Item) {
    if (!this.user) return;
    if (this.isFavorito) {
      await this.favoritosService.removeFavorito(item.id!);
    } else {
      await this.favoritosService.addFavorito(item);
    }
    this.isFavorito = !this.isFavorito;
  }

  /*
  async toggleFavorito(item: Item) {
    if (!this.authService.getCurrentUser()) return;
    if (this.isFavorito) {
      await this.favoritosService.removeFavorito(item.id!);
    } else {
      await this.favoritosService.addFavorito(item);
    }
    this.isFavorito = !this.isFavorito;
  }
  */

  /*
  marcarMeGusta(item: Item) {
    this.itemListService.incrementElegido(item.id!).then(() => {
      // Aquí luego llamaremos a marcar como favorito
      console.log('¡Voto registrado!');
    });
  }
  */

  /*
  item$!: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private itemListService: ItemListService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.item$ = this.itemListService.getItemById(id);
  }
  */

}
