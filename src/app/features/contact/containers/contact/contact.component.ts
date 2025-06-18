import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { TableInfo } from '@app/core/models/table-info.interface';
import { ContactInfoComponent } from '@app/features/contact/components/contact-info/contact-info.component';
import { SocialMediaInfoComponent } from '@app/features/contact/components/social-media-info/social-media-info.component';
import { FloatingIslandBackgroundComponent } from '@app/shared/layout/floating-island-background/floating-island-background.component';
import { ScrollRevealDirective } from '@app/core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ContactInfoComponent,
    SocialMediaInfoComponent,
    FloatingIslandBackgroundComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  imageUrl = signal('images/hands');
  tocSections = [
    { id: 'contact', title: 'Contact', completed: true },
    { id: 'social-media', title: 'Social Media', completed: true },
  ];

  contactInfo: WritableSignal<TableInfo> = signal({
    headers: ['Contact', 'Detail'],
    rows: [
      [
        { text: 'Address', icon: 'location' },
        { text: 'Calgary, Alberta, Canada' }
      ],
      [
        { text: 'Timezone', icon: 'timezone' },
        { text: 'UTC/GMT-6:00' }
      ],
      [
        { text: 'E-mail', icon: 'email' },
        {
          text: 'claudioriosgajardo@gmail.com',
          link: 'mailto:connect.claudioriosgajardo@gmail.com',
        },
      ],
    ],
    columnWidths: ['1', '2'],
  });

  socialMediaInfo: WritableSignal<TableInfo> = signal({
    headers: ['Social Media', 'Profile URL'],
    rows: [
      [
        { text: 'LinkedIn', icon: 'linkedin' },
        {
          text: 'linkedin.com/in/claudio-rios-gajardo',
          link: 'https://www.linkedin.com/in/claudio-rios-gajardo/',
        },
      ],
      [
        { text: 'Reddit', icon: 'reddit' },
        { text: 'claudio_riosg', link: 'https://www.reddit.com/user/Fair_Eye5343/' },
      ],
      [
        { text: 'GitHub', icon: 'github' },
        { text: '@claudio-riosg', link: 'https://github.com/claudio-riosg' },
      ],
    ],
    columnWidths: ['1', '2'],
  });
}