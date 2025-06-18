import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "@app/shared/layout/header/header.component";
import { FooterComponent } from "@app/shared/layout/footer/footer.component";
import { ScrollRevealDirective } from "@app/core/directives/scroll-reveal.directive";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent,ScrollRevealDirective],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer  appScrollReveal [delay]="100" />
  `
})
export class MainLayoutComponent {}