import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {Item} from "../../models/item.model";
import {Router} from "@angular/router";
import {ItemListService} from "../../services/item-list.service";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  items$!: Observable<Item[]>;

  constructor(
    private itemService: ItemListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items$ = this.itemService.getMostChosenItems(5);
  }

  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }

}
