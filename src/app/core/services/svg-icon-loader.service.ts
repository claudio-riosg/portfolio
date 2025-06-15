import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SvgIconLoaderService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private iconCache = new Map<string, SafeHtml>();
  private spriteCache: SafeHtml | null = null;

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
}
