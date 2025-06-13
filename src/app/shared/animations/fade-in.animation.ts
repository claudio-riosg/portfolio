import { transition, style, animate, trigger } from '@angular/animations';

export const fadeIn = (duration: string = '400ms') => 
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration} ease-out`, style({ opacity: 1 }))
    ])
  ]);