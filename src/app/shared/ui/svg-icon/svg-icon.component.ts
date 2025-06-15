import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconConfig } from '../../../core/models/icon-config.interface'; // Asegúrate de tener este modelo definido
import { SvgIconLoaderService } from '../../../core/services/svg-icon-loader.service';
import { effect, signal } from '@angular/core';


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
  iconLoader = inject(SvgIconLoaderService);

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
  /**
   * Input to determine if the icon should be loaded as an external, individual SVG file.
   * If true, the component attempts to load an SVG file named after the 'name' property (e.g., 'icon-name.svg')
   * from the path specified in SvgIconLoaderService (typically 'icons/').
   * This overrides sprite-based loading.
   * Defaults to false.
   */
  external = input(false);
  /**
   * Input to indicate that the SVG sprite sheet (defined by `config.spritePath`)
   * should be dynamically loaded or checked for in the DOM.
   * If true, the component first checks if an `<object>` tag with an ID matching the sprite sheet name
   * (e.g., 'sprite-svg' if spritePath is 'icons/sprite.svg') has already loaded the sprite.
   * If not found or not ready, it falls back to loading the sprite sheet using `SvgIconLoaderService.loadSprite()`.
   * This is ignored if `external` is true.
   * Defaults to false.
   */
  spriteExternal = input(false);
  svgHtml = signal<SafeHtml | null>(null);
  spriteHtml = signal<SafeHtml | null>(null);

  constructor() {
    effect(() => {
      const config = this.currentConfig();
      if (this.external()) {
        this.iconLoader
          .loadIcon(
            config.name + '.svg',
            'icons',
            config.size,
            config.color
          )
          .subscribe({
            next: html => this.svgHtml.set(html),
            error: err => console.error('Error loading external SVG:', config.name, err)
          });
      } else if (this.spriteExternal()) {
        // Wait for spriteReady signal
        if (!this.iconLoader.spriteReady()) {
          return;
        }
        // Check if the sprite is already loaded via an <object> tag in index.html (optimization)
        const spriteId = config.spritePath.split('/').pop()?.split('.')[0];
        const spriteObject = document.getElementById(`${spriteId}-svg`);
        if (spriteObject && spriteObject instanceof HTMLObjectElement && spriteObject.contentDocument) {
          const svgContent = spriteObject.contentDocument.documentElement;
          if (svgContent) {
            this.spriteHtml.set(this.sanitizer.bypassSecurityTrustHtml(svgContent.outerHTML));
            return;
          }
        }
        // Fallback to service loading
        this.iconLoader
          .loadSprite(config.spritePath)
          .subscribe({
            next: html => this.spriteHtml.set(html),
            error: err => console.error('Error loading sprite:', config.spritePath, err)
          });
      }
    });
  }

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


}