import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  HostListener,
  OnDestroy,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../../ui/theme-toggle/theme-toggle.component';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { LogoComponent } from '../../ui/logo/logo.component';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LogoComponent,
    NavLinksComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  readonly menuOpen = signal(false);
  readonly isScrolled = signal(false);
  private readonly mobileBreakpoint = 768;
  private readonly destroy$ = new Subject<void>();
  private readonly windowWidth = signal(window.innerWidth);

  readonly isMobileView = computed(() => this.windowWidth() <= this.mobileBreakpoint);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });

    fromEvent(window, 'resize').pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.windowWidth.set(window.innerWidth);
      if (!this.isMobileView() && this.menuOpen()) this.closeMenu();
    });
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isScrolled.set(window.scrollY > 10);
    });
  }

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void { this.menuOpen.set(false); }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const header = target.closest('.header');
    const burger = target.closest('.burger');
    const navLink = target.closest('.nav-links a');
    if (!header && !burger && !navLink && this.menuOpen()) this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  onEscapeKeydown(): void { if (this.menuOpen()) this.closeMenu(); }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.destroy$.next();
    this.destroy$.complete();
  }
}
