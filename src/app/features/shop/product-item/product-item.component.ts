import {Component, Input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TruncateTextPipe} from '../../../truncate-text-pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    CurrencyPipe,
    MatCardActions,
    MatButton,
    MatIcon,
    TruncateTextPipe,
    RouterLink
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;
  exchangeRate = 56.5 * 0.75;
}
