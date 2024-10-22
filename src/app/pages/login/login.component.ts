import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { loginTexts } from '@lib/staticTexts';

// ng.getComponent($0)

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  host: {
    class: 'flex flex-col justify-center items-center h-dvh',
  },
})
export class LoginComponent {
  texts = loginTexts;

  onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    // TODO implement logic for sending data for being authenticated

    formData.reset();
  }
}
