import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AddNewCompanyComponent } from '@app/shared/add-new-company/add-new-company.component';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewFuneralComponent } from '@app/shared/add-new-funeral/add-new-funeral.component';
import { IconComponent } from '@app/ui/icon/icon.component';
import { EDashboardModalVariants, type TDashboardModalVariants } from '../lib';
import { dashboard } from '@lib/staticTexts';

@Component({
  selector: 'app-dashboard-add-buttons',
  standalone: true,
  imports: [ModalComponent, AddNewFuneralComponent, AddNewCompanyComponent, IconComponent,
    MatButtonModule, MatTooltipModule,
  ],
  templateUrl: './dashboard-add-buttons.component.html',
  styleUrl: './dashboard-add-buttons.component.css',
  host: { class: 'flex flex-row items-center gap-5 mt-auto' },
})
export class DashboardAddButtonsComponent {
  protected _texts = dashboard;
  protected _EModalVariant = EDashboardModalVariants;
  isModalOpen = signal<TDashboardModalVariants>({
    [EDashboardModalVariants.NewCompany]: false,
    [EDashboardModalVariants.NewFuneral]: false,
  });

  toggleModal(variant: EDashboardModalVariants): void {
    this.isModalOpen.update(prevState => ({
      ...prevState,
      [variant]: !this.isModalOpen()[variant],
    }));
  }

  handleModalVariantOpen(variant: EDashboardModalVariants): boolean {
    return this.isModalOpen()[variant];
  }
}
