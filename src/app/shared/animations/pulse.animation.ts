import { animation, style, animate, keyframes } from '@angular/animations';

export const pulse = animation([
  animate(
    '{{ timings }}',  // Flex params for flexibility
    keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale(1.05)', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 }),
    ])
  ),
], { 
  params: { 
    timings: '1.5s cubic-bezier(0.4, 0, 0.6, 1)',
    iterations: 'infinite'
  } 
});