import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ItemFavoritesService} from "../../services/item-favorites.service";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-item-favorites',
  templateUrl: './item-favorites.page.html',
  styleUrls: ['./item-favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemFavoritesPage implements OnInit {

  favoritos$!: Observable<any[]>;

  constructor(
    private favoritosService: ItemFavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favoritos$ = this.favoritosService.getMisFavoritos();
  }

  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }

}
