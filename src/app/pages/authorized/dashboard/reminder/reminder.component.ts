import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [MatIcon, MatTooltipModule],
  templateUrl: './reminder.component.html',
  host: {
    class: 'w-full h-full overflow-hidden bg-blue-light rounded-md border border-blue-fresh',
  }
})
export class ReminderComponent {

}
