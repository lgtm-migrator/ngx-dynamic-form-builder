import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormGroupField } from '../models/dynamic-form-group-field';
import { ValidationMetadata } from 'class-validator-multi-lang';

export class DynamicFormControl extends FormControl {
  public controlName: string;
  public validationDefinitions: ValidationMetadata[];

  constructor(name: string, fieldDefinition: DynamicFormGroupField) {
    super(
      fieldDefinition.data instanceof Observable ? null : fieldDefinition.data,
      fieldDefinition.validationFunctions
        .filter((func) => func.type === 'sync')
        .map((func) => func.validator as ValidatorFn),
      fieldDefinition.validationFunctions
        .filter((func) => func.type === 'async')
        .map((func) => func.validator as AsyncValidatorFn)
    );
    this.controlName = name;
    this.validationDefinitions = fieldDefinition.validationDefinitions;
  }
}
