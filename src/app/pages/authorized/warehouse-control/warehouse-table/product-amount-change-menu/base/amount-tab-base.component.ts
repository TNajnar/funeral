import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { WarehouseService } from '@pages/authorized/warehouse-control/services/warehouse.service';
import {
  WarehouseTableGatewayService,
} from '@pages/authorized/warehouse-control/gateways/warehouse-table.gateway.service';
import { ErrorService } from 'services/error.service';

type TTexts = {
  title: string;
  tooltip: string;
  error: string;
};

@Component({
  selector: 'app-amount-tab-base',
  standalone: true,
  imports: [MatButtonModule],
  template: '',
})
export abstract class AmountTabBaseComponent {
  protected _texts!: TTexts;
  protected _productAmount?: number;

  protected _warehouseService: WarehouseService = inject(WarehouseService);
  protected _gateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);
  protected _errorService: ErrorService = inject(ErrorService);

  protected abstract _onSubmit(): void;

  protected abstract _handleClose(): void;
}
