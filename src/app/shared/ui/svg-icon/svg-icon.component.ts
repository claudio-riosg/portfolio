import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IconConfig } from '../../../core/models/icon-config.interface'; // Asegúrate de tener este modelo definido


@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'svg-icon.component.html',
  styleUrl: 'svg-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

  sanitizer= inject(DomSanitizer);

  config = input<IconConfig>({
    name: '',
    spritePath: 'icons/sprite.svg',
    size: '24px',
    color: 'currentColor',
    strokeColor: 'none',
    strokeWidth: '0',
    hoverable: true,
    darkMode: false,
  });

  currentConfig = computed<Required<IconConfig>>(() => {
  
    const providedConfig = this.config();
    return {
      name: providedConfig.name, 
      spritePath: providedConfig.spritePath ?? 'icons/sprite.svg',
      size: providedConfig.size ?? '24px',
      color: providedConfig.color ?? 'currentColor',
      strokeColor: providedConfig.strokeColor ?? 'none',
      strokeWidth: providedConfig.strokeWidth ?? '0',
      hoverable: providedConfig.hoverable ?? true,
      darkMode: providedConfig.darkMode ?? false,
    };
  });


  basePath = computed<SafeResourceUrl>(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentConfig().spritePath);
  });

}