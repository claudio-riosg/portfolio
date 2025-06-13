import { Injectable } from '@angular/core';
import { Observable, fromEvent, auditTime, map, startWith, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NetworkIdleService {
  private networkIdle$: Observable<boolean>;

  constructor() {
    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    const activity$ = merge(
      ...activityEvents.map(event => fromEvent(document, event, { passive: true }))
    );

    this.networkIdle$ = activity$.pipe(
      auditTime(5000), // Espera 5 segundos de inactividad
      map(() => false), // Hay actividad
      startWith(true) // Estado inicial
    );
  }

  public isIdle(): Observable<boolean> {
    return this.networkIdle$;
  }
}