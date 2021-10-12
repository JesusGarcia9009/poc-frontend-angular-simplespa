import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { SessionService } from './services/session-service.service';

@Component({
  selector: 'mf-login',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mf-login';

  constructor(private auth: AuthService, private session: SessionService) {}

  onLogin() {
    const token = this.auth.authenticate();
    this.session.startSession(token);
    document.location.href = '/layout';
  }
}
