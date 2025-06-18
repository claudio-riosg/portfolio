import { Component, signal, WritableSignal } from '@angular/core';
import { TocComponent } from '../../../../shared/ui/toc/toc.component';
import { TableInfo } from '../../../../core/models/table-info.interface';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';
import { SocialMediaInfoComponent } from '../../components/social-media-info/social-media-info.component';
import { FloatingIslandBackgroundComponent } from '../../../../shared/layout/floating-island-background/floating-island-background.component';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

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
        { text: 'UTM/GMT-6:00' }
      ],
      [
        { text: 'E-mail', icon: 'email' },
        {
          text: 'connect.claudioriosgajardo@gmail.com',
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
        { text: 'Twitter', icon: 'twitter' },
        { text: 'x.com/---', link: '-------' },
      ],
      [
        { text: 'GitHub', icon: 'github' },
        { text: '@claudio-riosg', link: 'https://github.com/claudio-riosg' },
      ],
    ],
    columnWidths: ['1', '2'],
  });
}