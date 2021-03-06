/*
EasyShare - a module of CIRCABC
Copyright (C) 2019 European Commission

This file is part of the "EasyShare" project.

This code is publicly distributed under the terms of EUPL-V1.2 license,
available at root of the project or at https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12.
*/
import { Component, OnInit } from '@angular/core';
import { UsersService, UserInfo } from '../openapi';
import { NotificationService } from '../common/notification/notification.service';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  public faUser = faUser;
  public faUserTie = faUserTie;

  public searchIsLoading = false;
  public isAfterSearch = false;
  public isAfterSelected = false;
  public isChangePermissions = false;

  public searchString = '';

  private pageSize = 10;
  public pageNumber = 0;

  public userInfoArray: Array<UserInfo> = new Array();
  public userInfoArrayNext: Array<UserInfo> = new Array();
  public userInfoArrayPrevious: Array<UserInfo> = new Array();

  private selectedUserInfoIndex = 0;

  public valuesInGigaBytes = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    60,
    70,
    80,
    100,
    1024
  ];
  public selectedValueInGigaBytesIndex = 0;

  public selectedValueInGigaBytes = 0;

  public selectedIsAdminValue = false;
  public changeIsLoading = false;

  constructor(
    private router: Router,
    private usersApi: UsersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  public async resultsNextPage() {
    this.removeSelection();
    this.pageNumber++;
    this.userInfoArrayPrevious = this.userInfoArray;
    this.userInfoArray = this.userInfoArrayNext;

    if (this.userInfoArrayNext.length >= this.pageSize) {
      this.userInfoArrayNext = new Array();
      this.userInfoArrayNext = await this.usersApi
        .getUsersUserInfo(this.pageSize, this.pageNumber + 1, this.searchString)
        .toPromise();
    }
  }

  public async resultsPreviousPage() {
    this.removeSelection();
    this.pageNumber--;
    this.userInfoArrayNext = this.userInfoArray;
    this.userInfoArray = this.userInfoArrayPrevious;

    if (this.pageNumber >= 1) {
      this.userInfoArrayPrevious = await this.usersApi
        .getUsersUserInfo(this.pageSize, this.pageNumber - 1, this.searchString)
        .toPromise();
    }
  }

  public async search() {
    try {
      this.searchIsLoading = true;
      this.isAfterSearch = false;

      this.pageNumber = 0;

      this.removeSelection();

      this.userInfoArrayNext = new Array();
      this.userInfoArrayPrevious = new Array();

      this.userInfoArray = await this.usersApi
        .getUsersUserInfo(this.pageSize, this.pageNumber, this.searchString)
        .toPromise();
      if (this.userInfoArray.length >= this.pageSize) {
        this.userInfoArrayNext = await this.usersApi
          .getUsersUserInfo(
            this.pageSize,
            this.pageNumber + 1,
            this.searchString
          )
          .toPromise();
      }
      this.isAfterSearch = true;
    } catch (error) {
      // managed in interceptor
    } finally {
      this.searchIsLoading = false;
    }
  }

  public displayUserInfoNumber(i: number) {
    this.selectedUserInfoIndex = i;
    this.selectedValueInGigaBytes = Math.floor(
      this.userInfoArray[i].totalSpace / (1024 * 1024 * 1024)
    );
    this.selectedIsAdminValue = this.userInfoArray[i].isAdmin;
    this.isAfterSelected = true;
  }

  public get selectedUserInfo(): UserInfo {
    return this.userInfoArray[this.selectedUserInfoIndex];
  }

  public removeSelection() {
    this.isAfterSelected = false;
  }

  public async changePermissions() {
    try {
      this.changeIsLoading = true;
      this.selectedUserInfo.totalSpace =
        this.selectedValueInGigaBytes * 1024 * 1024 * 1024;
      this.selectedUserInfo.isAdmin = this.selectedIsAdminValue;
      await this.usersApi
        .putUserUserInfo(this.selectedUserInfo.id, this.selectedUserInfo)
        .toPromise();
      this.notificationService.addSuccessMessage(
        'Your change was applied',
        true
      );
    } catch (error) {
      // managed in the interceptor
    } finally {
      this.changeIsLoading = false;
      this.isChangePermissions = false;
    }
  }

  public toggleChangePermissions() {
    this.isChangePermissions = !this.isChangePermissions;
  }

  public goToUserUploadedFiles() {
    this.router.navigate([
      '/administration',
      this.selectedUserInfo.id,
      'files',
      { userName: this.selectedUserInfo.givenName }
    ]);
  }
}
