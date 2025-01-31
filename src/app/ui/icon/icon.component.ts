import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type TIconType = (
  'add' | 'link' | 'search' | 'more_horiz' | 'delete' | 'keyboard_arrow_down' | 'info' | 'person' | 'close' | 'edit'
);

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  protected _iconVariant!: TIconType;
  protected _width?: number;
  protected _height?: number;
  protected _matSuffix: boolean = false;
  protected _className?: string;

  @Input({ required: true }) set iconVariant(variant: TIconType) {
    this._iconVariant = variant;
  };

  @Input({ required: false }) set width(width: number) {
    this._width = width;
  };

  @Input({ required: false }) set height(height: number) {
    this._height = height;
  };

  @Input({ required: false }) set matSuffix(matSuffix: boolean) {
    this._matSuffix = matSuffix;
  };

  @Input({ required: false }) set className(className: string) {
    this._className = className;
  };

  @Output() onClick = new EventEmitter<void>();

  @HostBinding('style') get hostStyles(): Record<string, string | undefined> {
    return {
      width: `${this._width}px`,
      height: `${this._height}px`,
      'max-height': `${this._height}px`,
    };
  }

  protected _handleClick(): void {
    this.onClick.emit();
  }
}
