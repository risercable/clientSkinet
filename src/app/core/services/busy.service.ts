import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  loading = signal(false);
  busyRequestCount = signal(0);

  busy() {
    this.loading.set(true);
    this.busyRequestCount.update(currentValue => currentValue + 1);
  }

  idle() {
    this.busyRequestCount.update(currentValue => currentValue - 1);

    if (this.busyRequestCount() <= 0) {
      this.busyRequestCount.set(0);
      this.loading.set(false);
    }
  }
}
