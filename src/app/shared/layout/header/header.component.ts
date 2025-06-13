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
  readonly menuOpen = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);
  private readonly mobileBreakpoint = 768;
  private readonly destroy$ = new Subject<void>();
  private readonly windowWidth = signal(window.innerWidth);

  readonly isMobileView = computed(() => {
    return this.windowWidth() <= this.mobileBreakpoint;
  });

  constructor() {
    // effect for handling body overflow based on menu state
    // This effect will run whenever menuOpen changes
    effect(() => {
      if (this.menuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.windowWidth.set(window.innerWidth);
      });

    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isScrolled.set(window.scrollY > 10);
      });
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const header = target.closest('.header');
    const burger = target.closest('.burger');
    const navLink = target.closest('.nav-links a');

    if (!header && !burger && !navLink && this.menuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKeydown(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isMobileView() === false && this.menuOpen()) {
      this.closeMenu();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.destroy$.next();
    this.destroy$.complete();
  }
}
