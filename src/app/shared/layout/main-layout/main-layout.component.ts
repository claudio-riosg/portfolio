import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "@app/shared/layout/header/header.component";
import { FooterComponent } from "@app/shared/layout/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer/>`
})
export class MainLayoutComponent {}