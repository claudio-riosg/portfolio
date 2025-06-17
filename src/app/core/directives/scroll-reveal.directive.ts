import { 
  Directive, 
  ElementRef, 
  OnInit, 
  OnDestroy, 
  Renderer2, 
  inject,
  input,
  signal,
  effect,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationClass?: string;
  delay?: number;
  staggerDelay?: number;
  disableOnReducedMotion?: boolean;
}

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  
  // Modern Angular 20 input signals
  threshold = input<number>(0.2);
  rootMargin = input<string>('0px 0px -50px 0px');
  triggerOnce = input<boolean>(true);
  animationClass = input<string>('scroll-reveal-visible');
  delay = input<number>(0);
  staggerDelay = input<number>(0);
  disableOnReducedMotion = input<boolean>(true);
  
  // Internal signals
  private isVisible = signal(false);
  private observer = signal<IntersectionObserver | null>(null);
  private hasTriggered = signal(false);
  
  constructor() {
    // Effect to handle visibility changes
    effect(() => {
      if (this.isVisible()) {
        this.animateIn();
      } else if (!this.triggerOnce() && !this.hasTriggered()) {
        this.animateOut();
      }
    });
  }
  
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Check for reduced motion preference
    if (this.disableOnReducedMotion() && this.prefersReducedMotion()) {
      this.renderer.addClass(this.elementRef.nativeElement, this.animationClass());
      return;
    }
    
    this.setupInitialState();
    this.setupIntersectionObserver();
  }
  
  ngOnDestroy(): void {
    const currentObserver = this.observer();
    if (currentObserver) {
      currentObserver.disconnect();
    }
  }
  
  private setupInitialState(): void {
    const element = this.elementRef.nativeElement;
    
    // Add initial hidden state
    this.renderer.addClass(element, 'scroll-reveal-hidden');
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(30px) scale(0.95)');
    this.renderer.setStyle(element, 'filter', 'blur(2px)');
    this.renderer.setStyle(element, 'transition', 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
  }
  
  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      threshold: this.threshold(),
      rootMargin: this.rootMargin()
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          
          if (this.triggerOnce()) {
            this.hasTriggered.set(true);
            observer.unobserve(entry.target);
          }
        } else if (!this.triggerOnce()) {
          this.isVisible.set(false);
        }
      });
    }, options);
    
    observer.observe(this.elementRef.nativeElement);
    this.observer.set(observer);
  }
  
  private animateIn(): void {
    const element = this.elementRef.nativeElement;
    const totalDelay = this.delay() + this.calculateStaggerDelay();
    
    setTimeout(() => {
      this.renderer.removeClass(element, 'scroll-reveal-hidden');
      this.renderer.addClass(element, this.animationClass());
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.setStyle(element, 'transform', 'translateY(0) scale(1)');
      this.renderer.setStyle(element, 'filter', 'blur(0px)');
    }, totalDelay);
  }
  
  private animateOut(): void {
    const element = this.elementRef.nativeElement;
    
    this.renderer.removeClass(element, this.animationClass());
    this.renderer.addClass(element, 'scroll-reveal-hidden');
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(30px) scale(0.95)');
    this.renderer.setStyle(element, 'filter', 'blur(2px)');
  }
  
  private calculateStaggerDelay(): number {
    if (this.staggerDelay() === 0) {
      return 0;
    }
    
    // Calculate stagger delay based on element position among siblings
    const parent = this.elementRef.nativeElement.parentElement;
    if (!parent) return 0;
    
    const siblings = Array.from(parent.children);
    const index = siblings.indexOf(this.elementRef.nativeElement);
    
    return index * this.staggerDelay();
  }
  
  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
} 