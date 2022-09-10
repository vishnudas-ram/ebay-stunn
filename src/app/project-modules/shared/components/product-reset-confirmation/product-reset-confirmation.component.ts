import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-reset-confirmation',
  templateUrl: './product-reset-confirmation.component.html',
  styleUrls: ['./product-reset-confirmation.component.scss']
})
export class ProductResetConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductResetConfirmationComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(value) {
    this.dialogRef.close({status:value});
  }
  ngOnInit(): void {
  }

}
