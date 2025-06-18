import { Component, input, computed, ChangeDetectionStrategy, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconConfig } from '@app/core/models/icon-config.interface';
import { SvgIconLoaderService } from '@app/core/services/svg-icon-loader.service';

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

  // Signal reactivo para readiness del sprite
  private spriteReady = signal<boolean>(false);

  constructor() {
    effect(() => {
      const config = this.currentConfig();
      this.spriteReady = this.iconLoader.getSpriteReadySignal(config.spritePath);
      if (this.external()) {
        this.iconLoader
          .loadIcon(
            config.name + '.svg',
            'icons',
            config.size,
            config.color
          )
          .subscribe({
            next: html => {
              this.svgHtml.set(html);
            },
          });
      } else if (this.spriteExternal()) {
        if (!this.spriteReady()) {
          return;
        }
        const spriteId = config.spritePath.split('/').pop()?.split('.')[0] + '-svg';
        const spriteObject = document.getElementById(spriteId);
        if (spriteObject && spriteObject instanceof HTMLObjectElement && spriteObject.contentDocument) {
          const svgContent = spriteObject.contentDocument.documentElement;
          if (svgContent) {
            this.spriteHtml.set(this.sanitizer.bypassSecurityTrustHtml(svgContent.outerHTML));
            return;
          }
        }
        this.iconLoader
          .loadSprite(config.spritePath)
          .subscribe({
            next: html => {
              this.spriteHtml.set(html);
            },
            error: err => {}
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