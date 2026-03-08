import {Component, inject, OnInit, signal} from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import {HttpClient} from '@angular/common/http';
import {Product} from './shared/models/product';
import {Pagination} from './shared/models/pagination';
import {ShopService} from './core/services/shop.service';
import {ShopComponent} from './features/shop/shop.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
class App {
  title = 'RiseSki';
}

export default App
