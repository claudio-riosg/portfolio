import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';
import { WorkExperience } from '@app/core/models/work-experience.interface';

@Component({
  selector: 'app-experience',
  imports: [ExperienceCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
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
    },   {
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
    },   {
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
    },   {
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
  ];
}
