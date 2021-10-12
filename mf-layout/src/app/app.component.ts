import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { SessionService } from './services/session-service.service';

@Component({
  selector: 'mf-layout',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mf-layout';

  constructor(private session: SessionService, private auth: AuthService) {}

  ngOnInit() {
    const token = this.session.getToken();

    if (!token || !this.auth.isTokenValid(token)) {
      document.location.href = '/login';
    }
  }
}
