import {Component, inject, OnInit, signal} from '@angular/core';
import {ShopService} from '../../core/services/shop.service';
import {Product} from '../../shared/models/product';
import {ProductItemComponent} from './product-item/product-item.component';
import {MatDialog} from '@angular/material/dialog';
import {FiltersDialogComponent} from './filters-dialog/filters-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {ShopParams} from '../../shared/models/shopParams';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Pagination} from '../../shared/models/pagination';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatPaginator
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  shopService = inject(ShopService);
  private dialogService: MatDialog = inject(MatDialog);
  products = signal<Pagination<Product>>({
    pageIndex: 0,
    pageSize: 10,
    count: 0,
    data: [] // Start with an empty array
  });
  sortOptions = [
    {
      name: 'Alphabetical',
      value: 'name'
    },
    {
      name: 'Prices: Low-High',
      value: 'priceAsc'
    },
    {
      name: 'Prices: High-Low',
      value: 'priceDesc'
    },
  ];
  shopParams = new ShopParams();
  pageSizeOptions = [5,10,15,20];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => this.products.set(response),
      error: error => console.log(error),
      complete: () => console.log(true),
    })
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options.at(0);

    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      }
    })
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopParams.pageNumber = 1;
          // apply filters ->
          this.getProducts();
        }
      }
    })
  }
}
