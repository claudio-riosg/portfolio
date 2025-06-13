import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SvgIconLoaderService {
  private http = Inject(HttpClient);
  private sanitizer = Inject(DomSanitizer);
  svgContent: SafeHtml | null = null;

  loadIcon(
    name: string,
    folder: string = 'icons',
    size: string = '24px',
    color: string = 'currentColor'
  ): import('rxjs').Observable<SafeHtml> {
    const path = `/${folder}/${name}`;
    return this.http.get(path, { responseType: 'text' as 'text' }).pipe(
      map((svg: string) => {
        const styledSvg = svg.replace(
          '<svg',
          `<svg width="${size}" height="${size}" fill="${color}"`
        );
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(styledSvg);
        return this.svgContent;
      })
    );
  }
}
