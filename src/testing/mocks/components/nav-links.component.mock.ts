import { Component, Input, signal, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-nav-links',
  template: '',
  standalone: true
})
export class MockNavLinksComponent {
  @Input() mobileMenuOpen = false;
  @Input() isMobileView = signal(false);
  @Output() linkClick = new EventEmitter<void>();
}