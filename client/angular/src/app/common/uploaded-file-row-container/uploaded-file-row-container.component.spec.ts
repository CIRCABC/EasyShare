/*
EasyShare - a module of CIRCABC
Copyright (C) 2019 European Commission

This file is part of the "EasyShare" project.

This code is publicly distributed under the terms of EUPL-V1.2 license,
available at root of the project or at https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12.
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileRowContainerComponent } from './uploaded-file-row-container.component';

describe('FileRowContainerComponent', () => {
  let component: FileRowContainerComponent;
  let fixture: ComponentFixture<FileRowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileRowContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileRowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
