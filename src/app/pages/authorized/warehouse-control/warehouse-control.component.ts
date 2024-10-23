import { Component, inject } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [],
  templateUrl: './warehouse-control.component.html',
})
export class WarehouseControlComponent {
  protected _authService: AuthService = inject(AuthService);
}
