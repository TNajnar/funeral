import { Component } from '@angular/core';

@Component({
    selector: 'shared-add-form-base-funeral-company',
    template: '',
})
export abstract class AddFormBaseFuneralCompanyComponent {
    protected abstract _onSubmit(): void;

    protected abstract _handleClose(): void;
}