import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Supplier } from '../supplier';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  horizontalPos: MatSnackBarHorizontalPosition = 'center';
  verticalPos: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private apiService: ApiService) {}

  supplierCkeckForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    edrpo: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{8}$'),
    ]),
  });

  ngOnInit(): void {}

  sendForm() {
    const supplier = new Supplier(this.supplierCkeckForm.value);
    this.apiService.sendSupplierForm(supplier).subscribe(
      (data) => {
        if (data){
          this._snackBar.open('Form successfully send!', 'OK', {
            horizontalPosition: this.horizontalPos,
            verticalPosition: this.verticalPos,
          });
          this.supplierCkeckForm.reset();
        }

      },
      (error) => {
        if (error){
          this._snackBar.open('Something went wrong. Try again!', 'OK', {
            horizontalPosition: this.horizontalPos,
            verticalPosition: this.verticalPos,
          });
          this.supplierCkeckForm.reset();
        }
    });
    
  }
}
