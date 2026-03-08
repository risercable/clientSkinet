import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {ShopService} from '../../../core/services/shop.service';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);

  product = signal<Product | undefined>(undefined);

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
