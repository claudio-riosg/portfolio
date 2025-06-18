import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, Observable, of, shareReplay } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SvgIconLoaderService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  private iconCache = new Map<string, SafeHtml>();
  private spriteCache: SafeHtml | null = null;
  private loadedSprites = new Set<string>();

  // Mapa para trackear el estado de readiness de cada sprite
  private spriteReadyMap = new Map<string, WritableSignal<boolean>>();

  /**
   * Devuelve el signal de readiness para un spritePath específico
   */
  getSpriteReadySignal(spritePath: string): WritableSignal<boolean> {
    if (!this.spriteReadyMap.has(spritePath)) {
      this.spriteReadyMap.set(spritePath, signal(false));
      this.checkSpriteReady(spritePath);
      // Observa el DOM por si el <object> se inserta después
      const observer = new MutationObserver(() => this.checkSpriteReady(spritePath));
      observer.observe(document.body, { childList: true, subtree: true });
    }
    return this.spriteReadyMap.get(spritePath)!;
  }

  /**
   * Genera el id del <object> a partir del spritePath
   */
  private getSpriteId(spritePath: string): string {
    const name = spritePath.split('/').pop()?.split('.')[0];
    return name ? `${name}-svg` : 'sprite-svg';
  }

  /**
   * Chequea si el sprite está listo y actualiza el signal correspondiente
   */
  private checkSpriteReady(spritePath: string) {
    const spriteId = this.getSpriteId(spritePath);
    const spriteObj = document.getElementById(spriteId);
    const readySignal = this.spriteReadyMap.get(spritePath);
    if (!readySignal) return;
    if (spriteObj && spriteObj instanceof HTMLObjectElement) {
      if (spriteObj.contentDocument) {
        readySignal.set(true);
      } else {
        spriteObj.addEventListener('load', () => readySignal.set(true), { once: true });
      }
    }
  }

  constructor() {
    // Ya no se chequea un sprite fijo aquí, sino bajo demanda por spritePath
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.loadedSprites.size > 0) {
        this.spriteCache = null;
      }
    });
  }

  loadIcon(
    name: string,
    folder: string = 'icons',
    size: string = '24px',
    color: string = 'currentColor'
  ): Observable<SafeHtml> {
    const path = `/${folder}/${name}`;
    if (this.iconCache.has(path)) {
      return of(this.iconCache.get(path)!);
    }
    return this.http.get(path, { responseType: 'text' as 'text' }).pipe(
      map((svg: string) => {
        const styledSvg = svg.replace(
          '<svg',
          `<svg width="${size}" height="${size}" fill="${color}"`
        );
        const safe = this.sanitizer.bypassSecurityTrustHtml(styledSvg);
        this.iconCache.set(path, safe);
        return safe;
      }),
      shareReplay(1)
    );
  }

  loadSprite(spritePath: string = '/icons/sprite.svg'): Observable<SafeHtml> {
    // Check if the sprite is already in the DOM
    if (this.isSpriteInDom(spritePath)) {
      return of(this.spriteCache || this.sanitizer.bypassSecurityTrustHtml(''));
    }
    // If I've a cached version and it's not in DOM, we need to reload
    this.loadedSprites.add(spritePath);
    if (this.spriteCache) {
      return of(this.spriteCache);
    }
    return this.http.get(spritePath, { responseType: 'text' as 'text' }).pipe(
      map((svg: string) => {
        const safe = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.spriteCache = safe;
        return safe;
      }),
      shareReplay(1)
    );
  }

  private isSpriteInDom(spritePath: string): boolean {
    const spriteId = this.getSpriteId(spritePath);
    const spriteObj = document.getElementById(spriteId);
    return !!(spriteObj && spriteObj instanceof HTMLObjectElement && spriteObj.contentDocument);
  }
}
