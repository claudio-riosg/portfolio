import { 
  transition, 
  style, 
  animate, 
  trigger, 
  query, 
  stagger, 
  AnimationTriggerMetadata,
  state
} from '@angular/animations';

// Simple fade in animation
export const fadeIn = (duration: string = '400ms'): AnimationTriggerMetadata => 
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration} ease-out`, style({ opacity: 1 }))
    ])
  ]);

// Cinematic fade in with transform
export const cinematicFadeIn = (
  duration: string = '800ms',
  delay: string = '0ms'
): AnimationTriggerMetadata =>
  trigger('cinematicFadeIn', [
    state('hidden', style({
      opacity: 0,
      transform: 'translateY(30px) scale(0.95)',
      filter: 'blur(2px)'
    })),
    state('visible', style({
      opacity: 1,
      transform: 'translateY(0) scale(1)',
      filter: 'blur(0px)'
    })),
    transition('hidden => visible', [
      animate(`${duration} ${delay} cubic-bezier(0.25, 0.46, 0.45, 0.94)`)
    ]),
    transition('visible => hidden', [
      animate(`400ms ease-in`)
    ])
  ]);