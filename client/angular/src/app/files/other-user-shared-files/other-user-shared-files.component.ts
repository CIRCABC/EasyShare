/*
EasyShare - a module of CIRCABC
Copyright (C) 2019 European Commission

This file is part of the "EasyShare" project.

This code is publicly distributed under the terms of EUPL-V1.2 license,
available at root of the project or at https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../common/notification/notification.service';

@Component({
  selector: 'app-other-user-shared-files',
  templateUrl: './other-user-shared-files.component.html'
})
export class OtherUserSharedFilesComponent implements OnInit {
  public userId!: string;
  public userName!: string;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    const userIdOrNull = this.route.snapshot.paramMap.get('userId');
    const userNameOrNull = this.route.snapshot.paramMap.get('userName');
    if (userIdOrNull && userNameOrNull) {
      this.userId = userIdOrNull;
      this.userName = userNameOrNull;
    } else {
      this.notificationService.addErrorMessage(
        'A problem occured while downloading files information. Please contact the support.'
      );
    }
  }
}
