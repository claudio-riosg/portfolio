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

  // Signal to indicate if the sprite is ready
  spriteReady: WritableSignal<boolean> = signal(false);

  constructor() {
    const spriteObj = document.getElementById('sprite-media-svg');
    if (spriteObj) {
      spriteObj.addEventListener('load', () => this.spriteReady.set(true));
      if ((spriteObj as HTMLObjectElement).contentDocument) {
        this.spriteReady.set(true);
      }
    }
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
    // Extract sprite ID from path (e.g., '/icons/sprite-media.svg' -> 'sprite-media')
    const spriteId = spritePath.split('/').pop()?.split('.')[0];
    if (!spriteId) return false;
    
    // Check if any symbols from this sprite exist in the DOM
    const symbols = document.querySelectorAll(`symbol[id]`);
    return symbols.length > 0;
  }
}
