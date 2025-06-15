import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
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
  external = input(false);
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
          .subscribe(html => this.svgHtml.set(html));
      } else if (this.spriteExternal()) {
        this.iconLoader
          .loadSprite(config.spritePath)
          .subscribe(html => this.spriteHtml.set(html));
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


  basePath = computed<SafeResourceUrl>(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentConfig().spritePath);
  });

  // Fallback: Si el icono no se carga, mostrar un SVG genérico
  onError(event: Event) {
    const svg = event.target as SVGElement;
    svg.innerHTML = `<rect width='100%' height='100%' fill='#eee'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' font-size='10'>?</text>`;
  }
}