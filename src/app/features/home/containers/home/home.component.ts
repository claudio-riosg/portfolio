import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { TechsDailyComponent } from '../../components/techs-daily/techs-daily.component';
import { FloatingIslandBackgroundComponent } from '../../../../shared/layout/floating-island-background/floating-island-background.component';
import { ThemeService } from '../../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { MyApproachComponent } from "../../components/my-approach/my-approach.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroComponent, TechsDailyComponent, FloatingIslandBackgroundComponent, MyApproachComponent],
  standalone: true,
  template: `
    <main class="home-container">
      <app-floating-island-background [imageUrl]="imageUrl()" [isDarkTheme]="themeService.isDark()"></app-floating-island-background>
      <app-hero
        (contactClick)="onContact()"
        (downloadCvClick)="onDownloadCv()"
      />
      <app-my-approach/>
      <app-techs-daily />
    </main>
  `,
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  themeService = inject(ThemeService);
  imageUrl=signal('images/island');

  onContact() {
    console.log('Lógica para contacto');
    // this.router.navigate(['/contact']);
  }

  onDownloadCv() {
    console.log('Lógica para descargar CV');
    // this.downloadService.downloadFile('/assets/cv.pdf');
  }
}
