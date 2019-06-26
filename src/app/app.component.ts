import { Component, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rl-playground';

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}
  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent) {
    console.log(`resize occurring: ${event}`);
    this.changeDetector.detectChanges();
  }
}
