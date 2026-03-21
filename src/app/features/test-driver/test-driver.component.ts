import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import { environment } from '../../../environments/environtment-dev';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test-driver',
  imports: [
    MatButton
  ],
  templateUrl: './test-driver.component.html',
  styleUrl: './test-driver.component.scss',
})
export class TestDriverComponent {
  private http = inject(HttpClient);
  validationErrors?: string[];

  get404Error() {
    return this.http.get(environment.baseUrl + 'bugs/notfound').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    })
  }

  get400Error() {
    return this.http.get(environment.baseUrl + 'bugs/badrequest').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    })
  }

  get401Error() {
    return this.http.get(environment.baseUrl + 'bugs/unauthorized').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    })
  }

  get500Error() {
    return this.http.get(environment.baseUrl + 'bugs/internalerror').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    })
  }

  get400ValidationError() {
    return this.http.post(environment.baseUrl + 'bugs/validationerror', {}).subscribe({
      next: response => console.log(response),
      error: error => this.validationErrors = error,
    })
  }
}
