import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShopService} from '../../../core/services/shop.service';
import {Product} from '../../../shared/models/product';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    MatDivider,

  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);

  product = signal<Product | undefined>(undefined);
  exchangeRate = 56.5 * 0.75;

  ngOnInit(): void {
    this.initProduct();
  }

  initProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) { return; }

    this.shopService.getProductById(+id).subscribe({
      next: product => this.product.set(product),
      error: error => console.log(error),
    });
  }
}
