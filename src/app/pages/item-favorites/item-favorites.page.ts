import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
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

  private router = inject(Router);
  private favoritosService = inject(ItemFavoritesService);

  favoritos$!: Observable<any[]>;


  ngOnInit() {
    this.favoritos$ = this.favoritosService.getMisFavoritos();
  }

  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }

}
