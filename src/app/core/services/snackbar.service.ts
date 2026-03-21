import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarRef = inject(MatSnackBar);

  error(message: string): void {
    this.snackbarRef.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snack-error'],
    });
  }

  success(message: string): void {
    this.snackbarRef.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snack-success'],
    });
  }
}
