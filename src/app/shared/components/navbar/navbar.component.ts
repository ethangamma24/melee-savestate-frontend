import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { AppRoutingModule } from '../../../app-routing.module';

import { AccountService } from '../../../services/account.service';
import { LocalStorageService } from '../../../services/local-storage.service';

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

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private account_service: AccountService,
    private local_storage_service: LocalStorageService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.local_storage_service.getLoggedIn().subscribe( (logged_in) => { this.logged_in = logged_in; });
    this.local_storage_service.getUsername().subscribe( (username) => { this.username = username; });
  }

  ngOnInit(): void {
    this.account_service.checkToken();
  }

  logout(): void {
    this.account_service.logout();
    this.logged_in = false;
  }

}
