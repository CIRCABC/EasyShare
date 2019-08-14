import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.css']
})
export class LinkInputComponent implements ControlValueAccessor {
  onChange!: () => void;
  onTouched!: () => void;

  @ViewChild("input") input!: ElementRef;
  disabled!: boolean;

  constructor(@Self() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDirective.control;
    if (control) {
      if (!control.validator) {
        control.setValidators([this.linkValidator(1)]);
      } else {
        control.setValidators([control.validator, this.linkValidator(1)]);
      }
      setTimeout(() => control.updateValueAndValidity({ emitEvent: true }));
    }
  }

  writeValue(value: any): void {
    this.input.nativeElement.value = value;
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  get errorMessage(): string | null {
    if (this.controlDirective.control && this.controlDirective.control.errors && this.controlDirective.control.errors.forbiddenLinkLength) {
      return "Link should be bigger than " + this.controlDirective.control.errors.forbiddenLinkLength.value;
    }
    return null;
  }

  public linkValidator(minCharacters: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const message: string = control.value;
      if (message) {
        const forbidden = message.length < minCharacters;
        return forbidden ? { 'forbiddenLinkLength': { value: minCharacters } } : null;
      }
      return null;
    };
  }
}
