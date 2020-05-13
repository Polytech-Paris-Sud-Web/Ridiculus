import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagerService {

  constructor(private errorMessageBar: MatSnackBar) { }

  showErrorMessage(errorMessage: string, errorDetails?: string): void {
    this.errorMessageBar.open(errorMessage, 'Ok', {
      duration: 5000,
    });
    throw new Error(`${errorMessage}\n${errorDetails}`);
  }

  showInfoMessage(infoMessage: string): void {
    this.errorMessageBar.open(infoMessage, 'Ok', {
      duration: 5000,
    });
  }

}
