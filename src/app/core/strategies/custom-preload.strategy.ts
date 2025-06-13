import { inject, Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { NetworkIdleService } from '../services/shared/performance/network-idle.service';

@Injectable({ providedIn: 'root' })
export class CustomPreloadStrategy implements PreloadingStrategy {

   protected readonly networkIdleServicetionService = inject(NetworkIdleService);

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = (delay: number) => 
      delay > 0 ? timer(delay).pipe(mergeMap(() => load())) : load();
    // Estrategias:
    if (route.data?.['preload'] === true) {
      return loadRoute(0); // Precarga inmediata
    }
    if (route.data?.['preload'] === 'delayed') {
      return loadRoute(5000); // Precarga después de 5 segundos
    }
    if (route.data?.['preload'] === 'networkIdle') {
      return this.networkIdleServicetionService.isIdle().pipe(
        filter(isIdle => isIdle),
        take(1),
        mergeMap(() => load())
      );
    }
    return of(null);
  }
}