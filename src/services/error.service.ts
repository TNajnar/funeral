import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = signal<string>('');

  error: Signal<string> = this._error.asReadonly();

  showError(message: string): void {
    this._error.set(message);
  }

  clearError(): void {
    this._error.set('');
  }
}
