import { trigger, transition, style, animate, query, stagger, group } from '@angular/animations';


 export const slideUp = (
  durations: { fadeIn?: string, slideUp?: string } = {
    fadeIn: '400ms',
    slideUp: '500ms'
  },
  delay: string = '80ms',
  easing: string = 'cubic-bezier(0.25, 0.8, 0.25, 1)'
) => trigger('slideUp', [
  transition(':enter', [
    group([
      // Fade-in animation for the entire component
      query(':enter', [
        style({ opacity: 0 }),
        animate(`${durations.fadeIn} ease-out`, style({ opacity: 1 }))
      ], { optional: true }),
      
      // Slide-up animation for child elements
      query(':scope > span, :scope > p, :scope > div, :scope > a', [
        style({ 
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        stagger(delay, [
          animate(`${durations.slideUp} ${easing}`, 
            style({ 
              opacity: 1,
              transform: 'translateY(0)'
            })
          )
        ])
      ], { optional: true })
    ])
  ])
]);