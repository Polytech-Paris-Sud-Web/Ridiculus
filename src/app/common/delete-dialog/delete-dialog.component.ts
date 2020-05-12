import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  repeatTextForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    this.repeatTextForm = this.fb.group({
      confirmation: ['', [Validators.required, this.validateIdentical(data)]],
    });
  }

  private validateIdentical(labelToCheck: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => labelToCheck !== control.value
      ? { notIdentical: { value: control.value } }
      : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
