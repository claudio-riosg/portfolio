import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  imports: [],
  standalone:true,
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss'
})
export class ProfileImageComponent {
  @Input() imageUrl: string = '';
  @Input() altText: string = 'Portfolio Image';

}
