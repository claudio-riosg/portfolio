// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ButtonConfig } from '@app/shared/ui/button/button.types'; // Importa los tipos

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  animations: [],
})
export class ButtonComponent {

  @Input() config: ButtonConfig = {
    type: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  };

  @Output() clicked = new EventEmitter<void>();

  get buttonClasses() {
    return {
      'btn': true,
      'btn-primary': this.config.type === 'primary',
      'btn-outline': this.config.type === 'outline',
      'btn-transparent': this.config.type === 'transparent',
      'btn-text': this.config.type === 'text',
      'btn-danger': this.config.type === 'danger',
      'btn-sm': this.config.size === 'sm',
      'btn-md': this.config.size === 'md',
      'btn-lg': this.config.size === 'lg',
      'disabled': this.config.disabled,
      'loading': this.config.loading,
    };
  }

  handleClick() {
    if (!this.config.disabled && !this.config.loading) {
      this.clicked.emit();
    }
  }
}