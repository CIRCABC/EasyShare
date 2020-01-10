import { Component, OnInit } from '@angular/core';
import { SessionService, UsersService, FileService, UserInfo } from '../openapi';
import { NotificationService } from '../common/notification/notification.service';

@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit {

  public userInfo!: UserInfo;

  constructor(
    private sessionApi: SessionService,
    private userApi: UsersService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit() {
    await this.initializeUserInfo();
  }

  async initializeUserInfo() {
    const id = this.sessionApi.getStoredId();
    const userInfoStored = this.sessionApi.getStoredUserInfo();
    if (userInfoStored) {
      this.userInfo = userInfoStored;
    }

    if (id) {
      try {
        this.userInfo = await this.userApi.getUserUserInfo(id).toPromise();
      } catch (error) {
        this.notificationService.errorMessageToDisplay(
          error,
          'retrieving your user informations'
        );
      }
    }
  }




}