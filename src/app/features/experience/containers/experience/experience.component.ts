import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExperienceCardComponent } from '@app/features/experience/components/experience-card/experience-card.component';
import { WorkExperience } from '@app/core/models/work-experience.interface';
import { ThemeService } from '@app/core/services/theme.service';
import { FloatingIslandBackgroundComponent } from '@app/shared/layout/floating-island-background/floating-island-background.component';
import { ScrollRevealDirective } from '@app/core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [
    ExperienceCardComponent, 
    FloatingIslandBackgroundComponent,
    ScrollRevealDirective
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {

  themeService = inject(ThemeService);
  imageUrl = signal('images/stairs');
  
  workExperiences: WorkExperience[] = [
    {
      company: 'UNICOMER',
      title: 'FRONT-END Developer',
      period: 'June 2022 – December 2024',
      summary: 'Developed and maintained web applications, lead projects and provided help across different teams.',
      details: [
        'Developed and deployed a merchant payment application with Angular 13, utilizing NGRX for state management and Tailwind CSS for responsive design.',
        'Led the development of a comprehensive user management system with Angular 14, enabling the efficient creation and administration of merchant accounts.',
        'Designed and built a Progressive Web App (PWA) for credit management, optimizing performance and enhancing user engagement with Angular 15.',
        'Utilized unit testing frameworks (Jasmine and Karma) to ensure application reliability and maintainability.',
        'Managed version control and CI/CD pipelines using GitLab and GitLab CI to ensure consistent and efficient deployments.',
        'Collaborated in Agile sprints, delivering key features on time and improving overall team productivity.'
      ]
    },
    {
      company: 'BANCO ESTADO | SII Group',
      title: 'FRONT-END Developer',
      period: 'MARCH 2021- JUNE 2022',
      summary: 'Developed new modules, improved existing features, and ensured high-quality code standards.',
      details: [
        'Spearheaded the development of a new insurance module for Banco Estado mobile app, improving the functionality and user interface for a more intuitive customer experience.',
        'Implemented state management using NGXS and built reusable components with Angular 10.',
        'Ensured robust testing with Jasmine and Karma, improving code quality and reducing bugs.',
        'Integrated GitLab for version control and CI/CD, optimizing deployment processes.',
        'Worked in an Agile environment, contributing to sprint planning, retrospectives, and feature delivery.'
      ]
    },
    {
      company: 'IZYTECH',
      title: 'FULL-STACK DEVELOPER',
      period: 'DECEMBER 2020- MARCH 2021',
      summary: 'Developed and maintained internal systems, focusing on scalability and performance.',
      details: [
        'Developed and maintained a label management system and an internal support ticket system, providing scalable solutions for business operations.',
        'Applied Angular 10 for front-end development and .NET Core for back-end services, ensuring seamless integration between the two technologies.',
        'Managed databases in SQL Server hosted on AWS, ensuring efficient data storage and retrieval.',
        'Utilized Agile methodologies to enhance development workflows and project timelines.'
      ]
    }
  ];
}
