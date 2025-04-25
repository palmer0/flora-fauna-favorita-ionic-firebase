import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {Item} from "../../models/item.model";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {ItemListService} from "../../services/item-list.service";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ItemListPage implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private itemListService = inject(ItemListService);

  tipo: 'animal' | 'planta' = 'animal';
  items$!: Observable<Item[]>;

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') as 'animal' | 'planta';
    this.items$ = this.itemListService.getItemsByTipo(this.tipo);
  }


  openDetail(itemId: string) {
    this.itemListService.incrementElegido(itemId).then(() => {
      this.router.navigate(['/item-detail', itemId]);

    }).catch(error => {
      console.error('Error al incrementar votos:', error);
      this.router.navigate(['/item-detail', itemId]);
    });
  }

  addNewItem() {
    //this.router.navigate(['/item-form', { tipo: this.tipo }]);
    this.router.navigate(['/item-form', this.tipo]);
  }

}
