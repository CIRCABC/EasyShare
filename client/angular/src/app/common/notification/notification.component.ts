/*
EasyShare - a module of CIRCABC
Copyright (C) 2019 European Commission

This file is part of the "EasyShare" project.

This code is publicly distributed under the terms of EUPL-V1.2 license,
available at root of the project or at https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12.
*/
import { Component, Input, OnInit } from '@angular/core';
import { NotificationLevel } from './notification-level';
import { NotificationMessage } from './notification-message';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input()
  public message!: NotificationMessage;
  public animationClass = 'ui-message-show';

  constructor(
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.message) {
      if (this.message.autoclose) {
        let timeOutIntrevalInMiliSeconds = 3000;
        if (this.message.displayTime !== undefined) {
          timeOutIntrevalInMiliSeconds = this.message.displayTime * 1000;
        }
        setTimeout(() => {
          this.animationClass = 'ui-message-destroy';
        }, timeOutIntrevalInMiliSeconds - 400);

        setTimeout(() => {
          this.notificationService.removeMessage(this.message);
        }, timeOutIntrevalInMiliSeconds);
      }
    }
  }

  public getClassPerLevel(notificationLevel: NotificationLevel) {
    switch (notificationLevel) {
      case NotificationLevel.SUCCESS: {
        return 'notification box--message--success';
      }
      case NotificationLevel.INFO: {
        return 'notification box--message--information';
      }
      case NotificationLevel.WARNING: {
        return 'notification box--message--warning';
      }
      case NotificationLevel.ERROR: {
        return 'notification box--message--error';
      }
    }
  }

  public closeMessage(): void {
    this.notificationService.removeMessage(this.message);
  }

  get imageInfoLink(): string {
    return 'assets/img/info-signs.png';
  }

  get imageExclamationLink(): string {
    return 'assets/img/exclamation.png';
  }

  get imageErrorLink(): string {
    return 'assets/img/error-sign.png';
  }

  get imageCheckMarkLink(): string {
    return 'assets/img/check-mark.png';
  }
}
