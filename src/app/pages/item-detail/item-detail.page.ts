import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {Item} from "../../models/item.model";
import {ActivatedRoute} from "@angular/router";
import {ItemListService} from "../../services/item-list.service";
import {IonicModule} from "@ionic/angular";
import {ItemFavoritesService} from "../../services/item-favorites.service";
import {UserAuthService} from "../../services/user-auth.service";
import {User} from "@angular/fire/auth";
import {doc, Firestore, onSnapshot} from "@angular/fire/firestore";

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
    private itemListService: ItemListService,
    private firestore: Firestore,
  ) {}


  /*
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
  */

  ngOnInit() {

    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (!id) return;

      this.item$ = this.itemListService.getItemById(id);

      this.authService.currentUser$.subscribe(user => {
        this.user = user;
        if (user) {
          const favDocRef =
            doc(this.firestore, `users/${user.uid}/favoritos/${id}`);

          // Escucha en tiempo real si este item está en favoritos
          onSnapshot(favDocRef, docSnap => {
            this.isFavorito = docSnap.exists();
          });
        }
      });
    });
  }

  async toggleFavorito(item: Item) {
    if (!this.user) return;

    if (this.isFavorito) {
      await this.favoritosService.removeFavorito(item.id!);

    } else {
      await this.favoritosService.addFavorito(item);
    }

    // this.isFavorito = !this.isFavorito;
  }

}
