import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { AppRoutingModule } from '../../../app-routing.module';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mobileQuery: MediaQueryList;
  logged_in: boolean;
  username: any;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public account_service: AccountService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.logged_in = false;
    this.username = localStorage.getItem('user');
  }

  ngOnInit(): void {
    // TODO: Check to see if user is logged in
    if (localStorage.getItem('user') != null) {
      this.account_service.getLoggedIn().subscribe( (logged_in) => {
        this.logged_in = logged_in;
      });
      this.username = localStorage.getItem('user');
    }
    this.account_service.checkToken();
  }

  logout(): void {
    this.account_service.logout();
    this.logged_in = false;
  }

}
