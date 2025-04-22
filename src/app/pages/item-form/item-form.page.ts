import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../models/item.model";
import {ItemListService} from "../../services/item-list.service";
import {IonicModule} from "@ionic/angular";
import {ImageUploadService} from "../../services/image-upload.service";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemFormPage implements OnInit {

  item: Item = {
    nombre: '',
    descripcion: '',
    imagenUrl: '',
    tipo: 'animal',
  };

  isEditMode = false;
  id: string | null = null;
  uploading = false;

  constructor(
    private route: ActivatedRoute,
    private itemListService: ItemListService,
    private router: Router,
    private uploadService: ImageUploadService,
  ) {}


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const tipoParam = this.route.snapshot.paramMap.get('tipo');

    //console.log(`tipo: ${tipoParam}`);

    if (this.id) {
      this.isEditMode = true;
      this.itemListService.getItemById(this.id).subscribe((data) => {
        this.item = data;
      });

    } else if (tipoParam === 'animal' || tipoParam === 'planta') {
      this.item.tipo = tipoParam;
    }
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.uploading = true;

    try {
      const url = await this.uploadService.uploadImage(file);
      this.item.imagenUrl = url;

    } catch (err) {
      console.error('Error al subir imagen:', err);
    } finally {
      this.uploading = false;
    }
  }

  saveItem() {
    if (this.isEditMode && this.id) {
      this.itemListService.updateItem(this.id, this.item).then(() => {
        this.router.navigate(['/item-list', this.item.tipo]);
      });

    } else {
      this.itemListService.addItem(this.item).then(() => {
        this.router.navigate(['/item-list', this.item.tipo]);
      });
    }
  }

  /*
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const tipoParam = this.route.snapshot.paramMap.get('tipo');

    if (this.id) {
      this.isEditMode = true;
      this.itemListService.getItemById(this.id).subscribe((data) => {
        this.item = data;
      });
    } else if (tipoParam === 'animal' || tipoParam === 'planta') {
      this.item.tipo = tipoParam;
    }
  }

  saveItem() {
    if (this.isEditMode && this.id) {
      this.itemListService.updateItem(this.id, this.item).then(() => {
        this.router.navigate(['/item-list', this.item.tipo]);
      });
    } else {
      this.itemListService.addItem(this.item).then(() => {
        this.router.navigate(['/item-list', this.item.tipo]);
      });
    }
  }
  */

}
